import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getExperiencesByCity = query({
  args: {
    cityId: v.id("city"),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    const offset = args.offset ?? 0;

    // 1) Resolve the "city id" to a cityName so we can find ALL experiences for that cityName
    const cityDoc = await ctx.db.get(args.cityId);
    if (!cityDoc) {
      return {
        page: [],
        isDone: true,
        continueCursor: offset.toString(),
        total: 0,
        distinctCategories: [] as string[],
        distinctSubcategories: [] as string[],
      };
    }

    // 2) Collect all experienceIds for this cityName
    const cityRows = await ctx.db
      .query("city")
      .withIndex("byCityName", (q) => q.eq("cityName", cityDoc.cityName))
      .collect();

    const expIdSet = new Set<string>();
    for (const row of cityRows) {
      expIdSet.add(row.experienceId as unknown as string);
    }

    const expIds = Array.from(expIdSet);

    // 3) Compute distinct categories/subcategories across ALL matched experienceIds
    const catSet = new Set<string>();
    const subcatSet = new Set<string>();

    for (const id of expIds) {
      const cats = await ctx.db
        .query("category")
        .withIndex("byExperience", (q) => q.eq("experienceId", id as unknown as any))
        .collect();
      for (const c of cats) catSet.add(c.categoryName);

      const subs = await ctx.db
        .query("subcategory")
        .withIndex("byExperience", (q) => q.eq("experienceId", id as unknown as any))
        .collect();
      for (const s of subs) subcatSet.add(s.subcategoryName);
    }

    const distinctCategories = Array.from(catSet).sort();
    const distinctSubcategories = Array.from(subcatSet).sort();

    // 4) Manual pagination of the experienceId list
    const slice = expIds.slice(offset, offset + limit);
    const docs = [];
    for (const id of slice) {
      const d = await ctx.db.get(id as unknown as any);
      if (d) docs.push(d);
    }

    const newOffset = offset + limit;
    const isDone = newOffset >= expIds.length;

    return {
      page: docs,
      isDone,
      continueCursor: newOffset.toString(),
      total: expIds.length,
      distinctCategories,
      distinctSubcategories,
    };
  },
});


// Get all experiences by category (within a city)
export const getExperiencesByCategory = query({
  args: {
    cityId: v.id("city"),
    categoryName: v.string(),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { cityId, categoryName, limit = 50, offset = 0 } = args;

    // 1) resolve cityId → experienceIds
    const cityDoc = await ctx.db.get(cityId);
    if (!cityDoc) return { page: [], isDone: true, continueCursor: offset.toString(), total: 0, distinctCategories: [], distinctSubcategories: [] };

    const cityRows = await ctx.db
      .query("city")
      .withIndex("byCityName", (q) => q.eq("cityName", cityDoc.cityName))
      .collect();

    const cityExpIds = new Set(cityRows.map(r => r.experienceId as unknown as string));

    // 2) find categories with this name, restricted to those expIds
    const catRows = await ctx.db
      .query("category")
      .withIndex("byCategoryName", (q) => q.eq("categoryName", categoryName))
      .collect();

    const expIds = Array.from(new Set(
      catRows
        .map(r => r.experienceId as unknown as string)
        .filter(id => cityExpIds.has(id))
    ));

    // 3) gather distinct cats/subcats
    const catSet = new Set<string>();
    const subcatSet = new Set<string>();
    for (const id of expIds) {
      const cats = await ctx.db.query("category").withIndex("byExperience", q => q.eq("experienceId", id as any)).collect();
      cats.forEach(c => catSet.add(c.categoryName));

      const subs = await ctx.db.query("subcategory").withIndex("byExperience", q => q.eq("experienceId", id as any)).collect();
      subs.forEach(s => subcatSet.add(s.subcategoryName));
    }

    // 4) paginate experiences
    const slice = expIds.slice(offset, offset + limit);
    const docs: any[] = [];
    for (const id of slice) {
      const d = await ctx.db.get(id as any);
      if (d) docs.push(d);
    }

    return {
      page: docs,
      isDone: offset + limit >= expIds.length,
      continueCursor: (offset + limit).toString(),
      total: expIds.length,
      distinctCategories: Array.from(catSet),
      distinctSubcategories: Array.from(subcatSet),
    };
  },
});


// Get all experiences by category + subcategory (within a city)
export const getExperiencesBySubcategory = query({
  args: {
    cityId: v.id("city"),
    categoryName: v.string(),
    subcategoryName: v.string(),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { cityId, categoryName, subcategoryName, limit = 50, offset = 0 } = args;

    // 1) resolve cityId → experienceIds
    const cityDoc = await ctx.db.get(cityId);
    if (!cityDoc) return { page: [], isDone: true, continueCursor: offset.toString(), total: 0, distinctCategories: [], distinctSubcategories: [] };

    const cityRows = await ctx.db
      .query("city")
      .withIndex("byCityName", (q) => q.eq("cityName", cityDoc.cityName))
      .collect();

    const cityExpIds = new Set(cityRows.map(r => r.experienceId as unknown as string));

    // 2) find experiences with categoryName
    const catRows = await ctx.db
      .query("category")
      .withIndex("byCategoryName", (q) => q.eq("categoryName", categoryName))
      .collect();
    const catExpIds = new Set(catRows.map(r => r.experienceId as unknown as string));

    // 3) find experiences with subcategoryName
    const subRows = await ctx.db
      .query("subcategory")
      .withIndex("bySubcategoryName", (q) => q.eq("subcategoryName", subcategoryName))
      .collect();
    const subExpIds = new Set(subRows.map(r => r.experienceId as unknown as string));

    // 4) intersection restricted to cityExpIds
    const expIds = Array.from(catExpIds).filter(id => subExpIds.has(id) && cityExpIds.has(id));

    // 5) distinct categories/subcategories
    const catSet = new Set<string>();
    const subcatSet = new Set<string>();
    for (const id of expIds) {
      const cats = await ctx.db.query("category").withIndex("byExperience", q => q.eq("experienceId", id as any)).collect();
      cats.forEach(c => catSet.add(c.categoryName));

      const subs = await ctx.db.query("subcategory").withIndex("byExperience", q => q.eq("experienceId", id as any)).collect();
      subs.forEach(s => subcatSet.add(s.subcategoryName));
    }

    // 6) paginate
    const slice = expIds.slice(offset, offset + limit);
    const docs: any[] = [];
    for (const id of slice) {
      const d = await ctx.db.get(id as any);
      if (d) docs.push(d);
    }

    return {
      page: docs,
      isDone: offset + limit >= expIds.length,
      continueCursor: (offset + limit).toString(),
      total: expIds.length,
      distinctCategories: Array.from(catSet),
      distinctSubcategories: Array.from(subcatSet),
    };
  },
});




/* --- The standard CRUD you already had/needed (kept here for completeness) --- */

export const getAllExperiences = query({
  args: { limit: v.optional(v.number()), offset: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const { limit = 50, offset = 0 } = args;
    return await ctx.db
      .query("experience")
      .order("desc")
      .paginate({ numItems: limit, cursor: offset > 0 ? offset.toString() : null });
  },
});

export const getExperienceById = query({
  args: { id: v.id("experience") },
  handler: async (ctx, args) => ctx.db.get(args.id),
});

export const getExperienceByTitle = query({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query("experience")
      .withIndex("byTitle", (q) => q.eq("title", args.title))
      .collect();
    return res[0] ?? null;
  },
});

export const createExperience = mutation({
  args: {
    type: v.string(),
    title: v.string(),
    price: v.string(),
    sale: v.string(),
    images: v.array(v.id("_storage")),
    mainImage: v.id("_storage"),
    experienceType: v.string(),
    tagOnCards: v.string(),
    features: v.array(v.string()),
    featureText: v.string(),
    highlights: v.string(),
    inclusions: v.string(),
    exclusions: v.string(),
    cancellationPolicy: v.string(),
    ticketValidity: v.string(),
    exploreMore: v.string(),
    knowBeforeYouGo: v.string(),
    myTickets: v.string(),
    operatingHours: v.array(
      v.object({
        startDate: v.number(),
        endDate: v.number(),
        openTime: v.string(),
        closeTime: v.string(),
        lastEntryTime: v.string(),
        title: v.string(),
      })
    ),
    whereTo: v.object({
      address: v.string(),
      lat: v.number(),
      lng: v.number(),
    }),
    datePriceRange: v.array(
      v.object({
        startDate: v.number(),
        endDate: v.number(),
        price: v.string(),
      })
    ),
    packageType: v.object({
      name: v.string(),
      price: v.string(),
      points: v.array(
        v.object({
          title: v.string(),
          subpoints: v.optional(v.array(v.string())),
        })
      ),
      timePriceSlots: v.array(
        v.object({
          openTime: v.string(),
          closeTime: v.string(),
          price: v.string(),
        })
      ),
    }),
    adultPrice: v.string(),
    childPrice: v.string(),
    seniorPrice: v.string(),
    totalLimit: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("experience", args);
  },
});

export const updateExperience = mutation({
  args: {
    id: v.id("experience"),
    patch: v.object({
      type: v.optional(v.string()),
      title: v.optional(v.string()),
      price: v.optional(v.string()),
      sale: v.optional(v.string()),
      images: v.optional(v.array(v.id("_storage"))),
      mainImage: v.optional(v.id("_storage")),
      experienceType: v.optional(v.string()),
      tagOnCards: v.optional(v.string()),
      features: v.optional(v.array(v.string())),
      featureText: v.optional(v.string()),
      highlights: v.optional(v.string()),
      inclusions: v.optional(v.string()),
      exclusions: v.optional(v.string()),     // <-- fixed (no extra parenthesis)
      cancellationPolicy: v.optional(v.string()),
      ticketValidity: v.optional(v.string()),
      exploreMore: v.optional(v.string()),
      knowBeforeYouGo: v.optional(v.string()),
      myTickets: v.optional(v.string()),
      operatingHours: v.optional(
        v.array(
          v.object({
            startDate: v.number(),
            endDate: v.number(),
            openTime: v.string(),
            closeTime: v.string(),
            lastEntryTime: v.string(),
            title: v.string(),
          })
        )
      ),
      whereTo: v.optional(
        v.object({
          address: v.string(),
          lat: v.number(),
          lng: v.number(),
        })
      ),
      datePriceRange: v.optional(
        v.array(
          v.object({
            startDate: v.number(),
            endDate: v.number(),
            price: v.string(),
          })
        )
      ),
      packageType: v.optional(
        v.object({
          name: v.string(),
          price: v.string(),
          points: v.array(
            v.object({
              title: v.string(),
              subpoints: v.optional(v.array(v.string())),
            })
          ),
          timePriceSlots: v.array(
            v.object({
              openTime: v.string(),
              closeTime: v.string(),
              price: v.string(),
            })
          ),
        })
      ),
      adultPrice: v.optional(v.string()),
      childPrice: v.optional(v.string()),
      seniorPrice: v.optional(v.string()),
      totalLimit: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { id, patch }) => {
    await ctx.db.patch(id, patch);
  },
});


export const deleteExperience = mutation({
  args: { id: v.id("experience") },
  handler: async (ctx, args) => ctx.db.delete(args.id),
});
