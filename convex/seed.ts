import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    const tables: string[] = [
      "experience",
      "city",
      "category",
      "subcategory",
      "faq",
      "reviews",
    ];
    for (const table of tables) {
      const docs = await ctx.db.query(table as any).collect();
      await Promise.all(docs.map((doc) => ctx.db.delete(doc._id)));
    }

    const createExperienceWithRelations = async (
      expData: {
        city: string;
        country: string;
        title: string;
        description: string;
        type: string;
        categories: string[];
        subcategories: string[];
        price: number;
        oldPrice?: number;
        sale?: number;
        image: string;
        rating: number;
        reviewsCount: number;
        tag?: string;
      },
      faqs: { q: string; a: string }[],
      reviews: { user: string; stars: number; text: string }[]
    ) => {
      const expId = await ctx.db.insert("experience", {
        type: expData.type,
        title: expData.title,
        description: expData.description,
        price: expData.price,
        oldPrice: expData.oldPrice,
        sale: expData.sale,
        images: [
          expData.image,
          "/images/r2.jpg.avif",
          "/images/r3.jpg.avif",
          "/images/r4.jpg.avif",
        ],
        mainImage: expData.image,
        experienceType: "tour",
        tagOnCards: expData.tag,
        rating: expData.rating,
        reviews: expData.reviewsCount,
        features: [
          "Feature A",
          "Feature B",
          "Feature C",
          "Feature D",
          "Feature E",
          "Feature F",
        ],
        featureText: "Highlights of the experience",
        highlights: "Main attractions of this wonderful experience.",
        inclusions: "Professional guide, entry tickets",
        exclusions: "Meals, hotel pickup and drop-off",
        cancellationPolicy:
          "Free cancellation up to 24 hours before the experience starts.",
        ticketValidity: "Valid for the selected date and time.",
        exploreMore: "Explore more related things to do in the city.",
        knowBeforeYouGo: "Please bring a valid photo ID.",
        myTickets: "Your tickets will be sent to your email.",
        operatingHours: [
          {
            startDate: Date.now(),
            endDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
            openTime: "09:00",
            closeTime: "18:00",
            lastEntryTime: "17:00",
            title: "Regular Hours",
          },
        ],
        whereTo: {
          address: `${expData.city} Central Plaza`,
          lat: 40.7128,
          lng: -74.006,
        },
        datePriceRange: [
          {
            startDate: Date.now(),
            endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
            price: expData.price,
          },
        ],
        packageType: {
          name: "Standard Admission",
          price: expData.price,
          points: [{ title: "All access pass" }],
          timePriceSlots: [
            { openTime: "09:00", closeTime: "18:00", price: expData.price },
          ],
        },
        adultPrice: expData.price,
        childPrice: expData.price * 0.7,
        seniorPrice: expData.price * 0.9,
        totalLimit: 1000,
      });

      await ctx.db.insert("city", {
        experienceId: expId,
        cityName: expData.city,
        countryName: expData.country,
      });

      for (const cat of expData.categories) {
        await ctx.db.insert("category", {
          experienceId: expId,
          categoryName: cat,
        });
      }

      for (const sub of expData.subcategories) {
        await ctx.db.insert("subcategory", {
          experienceId: expId,
          subcategoryName: sub,
        });
      }

      for (const f of faqs) {
        await ctx.db.insert("faq", {
          experienceId: expId,
          question: f.q,
          answer: f.a,
        });
      }

      for (const r of reviews) {
        await ctx.db.insert("reviews", {
          userId: r.user,
          experienceId: expId,
          stars: r.stars,
          images: [],
          text: r.text,
        });
      }
    };

    await createExperienceWithRelations(
      {
        city: "London",
        country: "United Kingdom",
        title: "London Musicals Extravaganza",
        description:
          "Experience the magic of London's West End with tickets to a top musical.",
        type: "ticket",
        categories: ["Entertainment"],
        subcategories: ["Musicals"],
        price: 75,
        image: "/images/d5.jpg.avif",
        rating: 4.8,
        reviewsCount: 1200,
        tag: "Popular",
      },
      [{ q: "What is the duration?", a: "Approx. 2.5 hours." }],
      [{ user: "jane_doe", stars: 5, text: "Absolutely stunning performance!" }]
    );
    await createExperienceWithRelations(
      {
        city: "London",
        country: "United Kingdom",
        title: "Historic Landmarks of London Tour",
        description:
          "Discover the rich history of London's most famous landmarks.",
        type: "tour",
        categories: ["Tours", "Tickets"],
        subcategories: ["Landmarks", "Walking Tours"],
        price: 50,
        image: "/images/r1.jpg.avif",
        rating: 4.6,
        reviewsCount: 950,
        tag: "Free cancellation",
      },
      [
        {
          q: "Is this a walking tour?",
          a: "Yes, it involves a moderate amount of walking.",
        },
      ],
      [{ user: "john_smith", stars: 4, text: "Very informative guide." }]
    );
    await createExperienceWithRelations(
      {
        city: "London",
        country: "United Kingdom",
        title: "Day Trip to Stonehenge & Bath",
        description:
          "Explore the ancient mystery of Stonehenge and the Roman Baths.",
        type: "tour",
        categories: ["Tours"],
        subcategories: ["Day Trips"],
        price: 120,
        image: "/images/r2.jpg.avif",
        rating: 4.9,
        reviewsCount: 2500,
        tag: "Best Seller",
      },
      [{ q: "Is lunch included?", a: "Lunch is not included." }],
      [
        {
          user: "emily_jones",
          stars: 5,
          text: "A long but totally worthwhile day!",
        },
      ]
    );
    await createExperienceWithRelations(
      {
        city: "London",
        country: "United Kingdom",
        title: "Thames River Evening Cruise",
        description:
          "See London's skyline light up from the iconic River Thames.",
        type: "cruise",
        categories: ["Cruises"],
        subcategories: ["Cruises"],
        price: 45,
        image: "/images/d3.jpg.avif",
        rating: 4.7,
        reviewsCount: 1800,
      },
      [{ q: "Are drinks available?", a: "Yes, there is a bar on board." }],
      [{ user: "michael_brown", stars: 5, text: "So romantic and beautiful." }]
    );

    await createExperienceWithRelations(
      {
        city: "Paris",
        country: "France",
        title: "Eiffel Tower Summit Experience",
        description:
          "Skip the lines and head straight to the top of the iconic Eiffel Tower for breathtaking views.",
        type: "ticket",
        categories: ["Tickets", "Sightseeing"],
        subcategories: ["Landmarks"],
        price: 89,
        image: "/images/d2.jpg.avif",
        rating: 4.9,
        reviewsCount: 3450,
        tag: "Skip The Line",
      },
      [
        {
          q: "How long can I stay at the top?",
          a: "You can stay as long as you like until closing time.",
        },
      ],
      [
        {
          user: "sophie_martin",
          stars: 5,
          text: "The view is worth every penny. Unforgettable!",
        },
      ]
    );

    await createExperienceWithRelations(
      {
        city: "Rome",
        country: "Italy",
        title: "Colosseum & Roman Forum Guided Tour",
        description:
          "Step back in time with a guided tour of ancient Rome's most important sites.",
        type: "tour",
        categories: ["Tours", "History"],
        subcategories: ["Landmarks", "Guided Tours"],
        price: 79,
        image: "/images/d3.jpg.avif",
        rating: 4.8,
        reviewsCount: 4200,
        tag: "Expert Guide",
      },
      [
        {
          q: "Is this tour suitable for children?",
          a: "Yes, it is engaging for all ages.",
        },
      ],
      [
        {
          user: "luca_rossi",
          stars: 5,
          text: "Our guide was fantastic! So much history.",
        },
      ]
    );

    await createExperienceWithRelations(
      {
        city: "Dubai",
        country: "United Arab Emirates",
        title: "Desert Safari with BBQ Dinner",
        description:
          "Experience dune bashing, camel rides, and a traditional BBQ dinner under the stars.",
        type: "adventure",
        categories: ["Adventure", "Tours"],
        subcategories: ["Day Trips"],
        price: 95,
        image: "/images/d4.jpg.avif",
        rating: 4.7,
        reviewsCount: 5100,
        tag: "Top Rated",
      },
      [
        {
          q: "Is hotel pickup included?",
          a: "Yes, pickup from most central Dubai hotels is included.",
        },
      ],
      [
        {
          user: "fatima_ali",
          stars: 5,
          text: "So much fun! The food was delicious and the entertainment was great.",
        },
      ]
    );

    await createExperienceWithRelations(
      {
        city: "New York",
        country: "United States",
        title: "Statue of Liberty & Ellis Island Ferry",
        description:
          "Visit two of America's most iconic landmarks with this convenient ferry ticket.",
        type: "ticket",
        categories: ["Tickets", "Sightseeing"],
        subcategories: ["Landmarks"],
        price: 45,
        image: "/images/d6.jpeg.avif",
        rating: 4.6,
        reviewsCount: 6300,
      },
      [
        {
          q: "Does this include pedestal or crown access?",
          a: "This ticket includes grounds access. Pedestal and crown access must be booked separately.",
        },
      ],
      [
        {
          user: "kevin_lee",
          stars: 4,
          text: "A must-do in NYC, but be prepared for crowds.",
        },
      ]
    );

    return "✅ Seed data inserted";
  },
});
