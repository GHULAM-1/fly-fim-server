import { mutation } from "./_generated/server";

// 👉 Replace with your uploaded image ID
const demoImage = "kg20p1a9zjrs6hqmbc5hda7r4d7prv9j" as any;

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Helper: insert one experience with related data
    const createExperienceWithRelations = async (
      cityName: string,
      countryName: string,
      title: string,
      type: string,
      categories: string[],
      subcategories: string[],
      faqs: { q: string; a: string }[],
      reviews: { user: string; stars: number; text: string }[]
    ) => {
      // 1) Create experience
      const expId = await ctx.db.insert("experience", {
        type,
        title,
        price: "59",
        sale: "49",
        images: [demoImage],
        mainImage: demoImage,
        experienceType: "tour",
        tagOnCards: "Bestseller",
        features: ["A", "B", "C", "D", "E", "F"],
        featureText: "Highlights of the experience",
        highlights: "Main attractions",
        inclusions: "Guide, tickets",
        exclusions: "Meals, transport",
        cancellationPolicy: "Free cancellation up to 24h",
        ticketValidity: "1 day",
        exploreMore: "Explore more things",
        knowBeforeYouGo: "Bring ID",
        myTickets: "Show at entrance",
        operatingHours: [
          {
            startDate: Date.now(),
            endDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
            openTime: "09:00",
            closeTime: "18:00",
            lastEntryTime: "17:00",
            title: "Regular",
          },
        ],
        whereTo: {
          address: `${cityName} Center`,
          lat: 40.0,
          lng: -73.0,
        },
        datePriceRange: [
          {
            startDate: Date.now(),
            endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
            price: "49",
          },
        ],
        packageType: {
          name: "Standard",
          price: "49",
          points: [{ title: "All access" }],
          timePriceSlots: [{ openTime: "09:00", closeTime: "18:00", price: "49" }],
        },
        adultPrice: "49",
        childPrice: "29",
        seniorPrice: "39",
        totalLimit: "1000",
      });

      // 2) Create city
      await ctx.db.insert("city", {
        experienceId: expId,
        cityName,
        countryName,
      });

      // 3) Categories
      for (const cat of categories) {
        await ctx.db.insert("category", {
          experienceId: expId,
          categoryName: cat,
        });
      }

      // 4) Subcategories
      for (const sub of subcategories) {
        await ctx.db.insert("subcategory", {
          experienceId: expId,
          subcategoryName: sub,
        });
      }

      // 5) FAQs
      for (const f of faqs) {
        await ctx.db.insert("faq", {
          experienceId: expId,
          question: f.q,
          answer: f.a,
        });
      }

      // 6) Reviews
      for (const r of reviews) {
        await ctx.db.insert("reviews", {
          userId: r.user,
          experienceId: expId,
          stars: r.stars,
          images: [demoImage],
          text: r.text,
        });
      }
    };

    // Seed dataset
    await createExperienceWithRelations(
      "Paris",
      "France",
      "Eiffel Tower Tour",
      "ticket",
      ["Sightseeing", "Architecture"],
      ["Tower", "City View"],
      [
        { q: "Is it skip-the-line?", a: "Yes, fast entry included." },
        { q: "Is guide included?", a: "Yes, guided tour in English." },
      ],
      [
        { user: "alice", stars: 5, text: "Amazing view!" },
        { user: "bob", stars: 4, text: "Great but crowded." },
      ]
    );

    await createExperienceWithRelations(
      "London",
      "UK",
      "London Eye Experience",
      "ticket",
      ["Sightseeing", "Family"],
      ["Wheel", "River"],
      [
        { q: "How long is the ride?", a: "About 30 minutes." },
        { q: "Is it kid friendly?", a: "Yes, suitable for all ages." },
      ],
      [
        { user: "charlie", stars: 5, text: "Loved it with family!" },
        { user: "david", stars: 3, text: "Good but overpriced." },
      ]
    );

    await createExperienceWithRelations(
      "New York",
      "USA",
      "Statue of Liberty Tour",
      "ticket",
      ["History", "Boat Tour"],
      ["Statue", "Island"],
      [
        { q: "Is ferry included?", a: "Yes, round-trip ferry ticket." },
        { q: "Do we get crown access?", a: "Depends on ticket type." },
      ],
      [
        { user: "emma", stars: 4, text: "Historic and beautiful." },
        { user: "frank", stars: 5, text: "Lifetime memory." },
      ]
    );

    await createExperienceWithRelations(
      "Rome",
      "Italy",
      "Colosseum Guided Tour",
      "ticket",
      ["History", "Culture"],
      ["Arena", "Gladiators"],
      [
        { q: "Is skip-the-line included?", a: "Yes, priority access." },
        { q: "Are headsets included?", a: "Yes, for guided tours." },
      ],
      [
        { user: "george", stars: 5, text: "Incredible history." },
        { user: "hannah", stars: 4, text: "Amazing but long queues." },
      ]
    );

    await createExperienceWithRelations(
      "Dubai",
      "UAE",
      "Burj Khalifa Observation Deck",
      "ticket",
      ["Modern", "Luxury"],
      ["Skyline", "Observation"],
      [
        { q: "Is sunset included?", a: "Yes, for evening slots." },
        { q: "Is fast-track available?", a: "Yes, with premium tickets." },
      ],
      [
        { user: "ivan", stars: 5, text: "Breathtaking views!" },
        { user: "julia", stars: 5, text: "Best experience ever." },
      ]
    );

    return "✅ Seed data inserted";
  },
});
