"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const server_1 = require("./_generated/server");
const dateHelpers_1 = require("./dateHelpers");
const SAMPLE_IMAGE_ID = "kg23s9k842bc60sve9947dc6017qvbxw";
const CITIES = [
    { cityName: "Rome", countryName: "Italy" },
    { cityName: "Paris", countryName: "France" },
    { cityName: "London", countryName: "United Kingdom" },
    { cityName: "Barcelona", countryName: "Spain" },
    { cityName: "Amsterdam", countryName: "Netherlands" },
    { cityName: "Dubai", countryName: "United Arab Emirates" },
    { cityName: "New York", countryName: "United States" },
    { cityName: "Tokyo", countryName: "Japan" }
];
const CATEGORIES = [
    "Tickets",
    "Tours",
    "Transportation",
    "Travel Services",
    "Cruises",
    "Food & Drink",
    "Entertainment",
    "Adventure",
    "Water Sports",
    "Wellness",
    "Specials"
];
const SUBCATEGORIES_BY_CATEGORY = {
    "Tickets": ["Museum Tickets", "Attraction Tickets", "Show Tickets", "Concert Tickets"],
    "Tours": ["Walking Tours", "Bus Tours", "Private Tours", "Group Tours", "Audio Tours"],
    "Transportation": ["Airport Transfer", "City Transport", "Car Rental", "Bike Rental"],
    "Travel Services": ["Travel Insurance", "Visa Services", "Currency Exchange", "Hotel Booking"],
    "Cruises": ["River Cruises", "Ocean Cruises", "Dinner Cruises", "Sunset Cruises"],
    "Food & Drink": ["Food Tours", "Wine Tasting", "Cooking Classes", "Restaurant Experiences"],
    "Entertainment": ["Theme Parks", "Museums", "Theaters", "Nightlife"],
    "Adventure": ["Hiking", "Rock Climbing", "Bungee Jumping", "Zip Lining"],
    "Water Sports": ["Scuba Diving", "Snorkeling", "Surfing", "Kayaking"],
    "Wellness": ["Spa Treatments", "Yoga Classes", "Meditation", "Wellness Retreats"],
    "Specials": ["Seasonal Offers", "Group Discounts", "Early Bird", "Last Minute Deals"]
};
const SAMPLE_FEATURES = [
    ["2 hr", "9:30am - 7:00pm", "Free cancellation up to 7 days before the start of your experience", "Book now without paying anything. Cancel for free if your plans change", "Guided Tour"],
    ["3 hr", "10:00am - 6:00pm", "Free cancellation up to 24 hours before", "Instant confirmation", "Audio Guide"],
    ["4 hr", "8:00am - 8:00pm", "Free cancellation up to 3 days before", "Mobile ticket", "Professional Guide"],
    ["1.5 hr", "11:00am - 5:00pm", "Non-refundable", "Print at home", "Small Group"],
    ["5 hr", "9:00am - 9:00pm", "Free cancellation up to 48 hours before", "Skip the line", "Transportation included"]
];
const SAMPLE_DESCRIPTIONS = [
    "Experience the best of this amazing destination with our carefully curated tour that combines history, culture, and unforgettable moments.",
    "Discover hidden gems and iconic landmarks with our expert local guides who bring stories to life through engaging narratives.",
    "Immerse yourself in authentic local culture while enjoying premium amenities and personalized service throughout your journey.",
    "Create lasting memories with this unique experience that offers exclusive access to remarkable locations and insider knowledge.",
    "Join us for an adventure that perfectly balances excitement, education, and entertainment in one comprehensive package."
];
const SAMPLE_ADDRESSES = [
    "123 Historic Center, Old Town District",
    "456 Cultural Quarter, Arts District",
    "789 Marina Boulevard, Waterfront Area",
    "321 Heritage Street, Museum Quarter",
    "654 Tourist Plaza, Central District"
];
// Helper function to format dates in MM-DD-YYYY format
const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
};
// Helper function to get future dates
const getFutureDates = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); // Tomorrow
    const midDate = new Date(today);
    midDate.setMonth(today.getMonth() + 6); // 6 months from now
    const endDate = new Date(today);
    endDate.setFullYear(today.getFullYear() + 1); // 1 year from now
    return {
        start: formatDate(startDate),
        mid: formatDate(midDate),
        end: formatDate(endDate)
    };
};
exports.seedDatabase = (0, server_1.mutation)({
    args: {},
    handler: async (ctx) => {
        // Clear existing data
        const existingCities = await ctx.db.query("city").collect();
        const existingCategories = await ctx.db.query("category").collect();
        const existingSubcategories = await ctx.db.query("subcategory").collect();
        const existingExperiences = await ctx.db.query("experience").collect();
        const existingFaqs = await ctx.db.query("faq").collect();
        const existingReviews = await ctx.db.query("reviews").collect();
        const existingUsers = await ctx.db.query("users").collect();
        // Delete existing data
        for (const item of existingExperiences)
            await ctx.db.delete(item._id);
        for (const item of existingFaqs)
            await ctx.db.delete(item._id);
        for (const item of existingReviews)
            await ctx.db.delete(item._id);
        for (const item of existingSubcategories)
            await ctx.db.delete(item._id);
        for (const item of existingCategories)
            await ctx.db.delete(item._id);
        for (const item of existingCities)
            await ctx.db.delete(item._id);
        for (const item of existingUsers)
            await ctx.db.delete(item._id);
        const currentDate = (0, dateHelpers_1.getCurrentCustomDate)();
        const dates = getFutureDates();
        // Seed Users
        const userProviderIds = [];
        const sampleUsers = [
            { name: "John Smith", email: "john.smith@example.com" },
            { name: "Sarah Johnson", email: "sarah.johnson@example.com" },
            { name: "Mike Davis", email: "mike.davis@example.com" },
            { name: "Emma Wilson", email: "emma.wilson@example.com" },
            { name: "James Brown", email: "james.brown@example.com" }
        ];
        for (const user of sampleUsers) {
            const providerId = `provider_${Math.random().toString(36).substr(2, 9)}`;
            await ctx.db.insert("users", {
                name: user.name,
                email: user.email,
                image: SAMPLE_IMAGE_ID,
                provider: "email",
                providerId: providerId,
                createdAt: currentDate,
                updatedAt: currentDate
            });
            userProviderIds.push(providerId);
        }
        // Seed Cities
        const cityIds = {};
        for (const city of CITIES) {
            const cityId = await ctx.db.insert("city", {
                image: SAMPLE_IMAGE_ID,
                cityName: city.cityName,
                countryName: city.countryName
            });
            cityIds[city.cityName] = cityId;
        }
        // Seed Categories
        const categoryIds = {};
        for (const categoryName of CATEGORIES) {
            const categoryId = await ctx.db.insert("category", {
                categoryName
            });
            categoryIds[categoryName] = categoryId;
        }
        // Seed Subcategories
        const subcategoryIds = {};
        for (const [categoryName, subcategories] of Object.entries(SUBCATEGORIES_BY_CATEGORY)) {
            for (const subcategoryName of subcategories) {
                const subcategoryId = await ctx.db.insert("subcategory", {
                    subcategoryName
                });
                subcategoryIds[subcategoryName] = subcategoryId;
            }
        }
        // Seed Experiences (2 per city per category)
        let experienceCounter = 0;
        const experienceIds = [];
        for (const city of CITIES) {
            for (const categoryName of CATEGORIES) {
                const subcategories = SUBCATEGORIES_BY_CATEGORY[categoryName];
                for (let i = 0; i < 2; i++) {
                    const subcategoryName = subcategories[i % subcategories.length];
                    const features = SAMPLE_FEATURES[experienceCounter % SAMPLE_FEATURES.length];
                    const description = SAMPLE_DESCRIPTIONS[experienceCounter % SAMPLE_DESCRIPTIONS.length];
                    const address = SAMPLE_ADDRESSES[experienceCounter % SAMPLE_ADDRESSES.length];
                    const basePrice = 50 + (experienceCounter % 200);
                    const oldPrice = Math.random() > 0.5 ? basePrice + 20 : undefined;
                    const sale = oldPrice ? Math.floor(((oldPrice - basePrice) / oldPrice) * 100) : undefined;
                    const experienceId = await ctx.db.insert("experience", {
                        title: `${categoryName} Experience in ${city.cityName} ${i + 1}`,
                        description,
                        price: basePrice,
                        oldPrice,
                        sale,
                        images: [SAMPLE_IMAGE_ID, SAMPLE_IMAGE_ID, SAMPLE_IMAGE_ID],
                        mainImage: [SAMPLE_IMAGE_ID],
                        tagOnCards: i === 0 ? "BESTSELLER" : "POPULAR",
                        features,
                        featureText: `Amazing ${categoryName.toLowerCase()} experience with professional guidance`,
                        highlights: `• Expert local guide\n• Skip-the-line access\n• Premium experience\n• Photo opportunities`,
                        inclusions: `• Professional guide\n• Entry tickets\n• Transportation\n• Refreshments`,
                        exclusions: `• Personal expenses\n• Tips and gratuities\n• Hotel pickup (unless specified)`,
                        cancellationPolicy: "Free cancellation up to 24 hours before the experience starts",
                        ticketValidity: "Valid for 1 year from purchase date",
                        exploreMore: `Discover more about ${city.cityName}'s rich culture and heritage`,
                        knowBeforeYouGo: `• Comfortable walking shoes recommended\n• Bring sunscreen and water\n• Photography allowed`,
                        youExperience: `You'll experience the best of ${city.cityName} with our expert guides`,
                        myTickets: "Mobile tickets accepted",
                        operatingHours: [
                            {
                                startDate: dates.start,
                                endDate: dates.end,
                                openTime: "09:00",
                                closeTime: "18:00",
                                lastEntryTime: "17:00",
                                title: "Regular Hours"
                            }
                        ],
                        whereTo: {
                            address: `${address}, ${city.cityName}`,
                            lat: 41.9028 + (Math.random() - 0.5) * 0.1,
                            lng: 12.4964 + (Math.random() - 0.5) * 0.1
                        },
                        datePriceRange: [
                            {
                                startDate: dates.start,
                                endDate: dates.mid,
                                price: basePrice
                            },
                            {
                                startDate: dates.mid,
                                endDate: dates.end,
                                price: basePrice + 10
                            }
                        ],
                        packageType: {
                            name: "Standard Package",
                            price: basePrice,
                            points: [
                                {
                                    title: "Included in Package",
                                    subpoints: ["Professional guide", "Entry tickets", "Transportation"]
                                },
                                {
                                    title: "Additional Benefits",
                                    subpoints: ["Skip-the-line access", "Photo opportunities", "Local insights"]
                                }
                            ],
                            timePriceSlots: [
                                { openTime: "09:00", closeTime: "12:00", price: basePrice },
                                { openTime: "14:00", closeTime: "17:00", price: basePrice + 5 }
                            ]
                        },
                        adultPrice: basePrice,
                        childPrice: Math.floor(basePrice * 0.7),
                        seniorPrice: Math.floor(basePrice * 0.8),
                        totalLimit: 50,
                        itinerary: {
                            title: `${categoryName} Journey in ${city.cityName}`,
                            totalDuration: "3 hours",
                            modeOfTransport: "Walking",
                            startPoint: {
                                name: "Meeting Point",
                                description: "Central location easy to find",
                                image: SAMPLE_IMAGE_ID,
                                duration: "15 min",
                                location: {
                                    address: `Meeting Point, ${city.cityName}`,
                                    lat: 41.9028,
                                    lng: 12.4964
                                },
                                highlights: ["Historic significance", "Photo opportunity"],
                                thingsToDo: ["Take photos", "Meet your guide"]
                            },
                            points: [
                                {
                                    order: 1,
                                    name: "First Stop",
                                    description: "Explore the main attraction",
                                    image: SAMPLE_IMAGE_ID,
                                    duration: "45 min",
                                    distance: "500m",
                                    travelTime: "10 min",
                                    location: {
                                        address: `First Stop, ${city.cityName}`,
                                        lat: 41.9038,
                                        lng: 12.4974
                                    },
                                    highlights: ["Historical importance", "Architecture"],
                                    thingsToDo: ["Guided tour", "Photography"],
                                    attractions: 1,
                                    ticketsIncluded: true
                                },
                                {
                                    order: 2,
                                    name: "Second Stop",
                                    description: "Cultural immersion experience",
                                    image: SAMPLE_IMAGE_ID,
                                    duration: "60 min",
                                    distance: "300m",
                                    travelTime: "5 min",
                                    location: {
                                        address: `Second Stop, ${city.cityName}`,
                                        lat: 41.9048,
                                        lng: 12.4984
                                    },
                                    highlights: ["Local culture", "Interactive experience"],
                                    thingsToDo: ["Participate in activities", "Learn local customs"],
                                    attractions: 2,
                                    ticketsIncluded: true
                                }
                            ],
                            endPoint: {
                                name: "Tour Conclusion",
                                description: "End of amazing journey",
                                image: SAMPLE_IMAGE_ID,
                                location: {
                                    address: `End Point, ${city.cityName}`,
                                    lat: 41.9058,
                                    lng: 12.4994
                                }
                            }
                        },
                        isMainCard: i === 0,
                        isTopExperience: Math.random() > 0.7,
                        isMustDo: Math.random() > 0.8,
                        isPopular: Math.random() > 0.6,
                        blogSlug: `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${city.cityName.toLowerCase()}-${i + 1}`,
                        categoryId: categoryIds[categoryName],
                        subcategoryId: subcategoryIds[subcategoryName],
                        cityId: cityIds[city.cityName]
                    });
                    experienceIds.push(experienceId);
                    experienceCounter++;
                }
            }
        }
        // Seed FAQs (2 per experience)
        for (const experienceId of experienceIds) {
            await ctx.db.insert("faq", {
                experienceId: experienceId,
                question: "What should I bring for this experience?",
                answer: "Please bring comfortable walking shoes, sunscreen, water, and your camera. All other necessary equipment will be provided."
            });
            await ctx.db.insert("faq", {
                experienceId: experienceId,
                question: "Is this experience suitable for children?",
                answer: "Yes, this experience is family-friendly and suitable for children aged 6 and above. Children under 18 must be accompanied by an adult."
            });
        }
        // Seed Reviews (3 per experience)
        const reviewTexts = [
            "Amazing experience! The guide was knowledgeable and friendly. Highly recommended!",
            "Perfect way to explore the city. Great value for money and well-organized tour.",
            "Exceeded my expectations. The highlights were incredible and the service was excellent.",
            "Wonderful experience with beautiful sights. The guide made it very engaging and fun.",
            "Outstanding tour! Professional service and amazing photo opportunities throughout."
        ];
        for (let i = 0; i < experienceIds.length; i++) {
            const experienceId = experienceIds[i];
            for (let j = 0; j < 3; j++) {
                const userId = userProviderIds[j % userProviderIds.length];
                await ctx.db.insert("reviews", {
                    userId,
                    experienceId: experienceId,
                    stars: 4 + Math.floor(Math.random() * 2), // 4 or 5 stars
                    images: [SAMPLE_IMAGE_ID],
                    text: reviewTexts[j % reviewTexts.length]
                });
            }
        }
        return {
            message: "Database seeded successfully!",
            stats: {
                users: userProviderIds.length,
                cities: CITIES.length,
                categories: CATEGORIES.length,
                subcategories: Object.values(SUBCATEGORIES_BY_CATEGORY).flat().length,
                experiences: experienceIds.length,
                faqs: experienceIds.length * 2,
                reviews: experienceIds.length * 3
            }
        };
    }
});
//# sourceMappingURL=seed.js.map