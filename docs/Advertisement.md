## Comprehensive Advertisement Feature Documentation

This document provides a complete overview of the advertisement feature, covering all aspects from data models and workflows to technical considerations and future enhancements.

**1. Introduction**

The advertisement feature allows hospitals, doctors, and health apps to promote their services on the platform, increasing visibility and reach. This document details the design, implementation, and management of this feature.

**2. Goals**

* Enable targeted advertising to specific user groups.
* Provide a flexible and scalable advertising platform.
* Offer various ad types and pricing models.
* Provide clear reporting and analytics for advertisers and administrators.
* Ensure a seamless and user-friendly experience for both advertisers and users.

**3. Data Models (Prisma Schema)**

```prisma
model Advertisement {
  id             String             @id @default(cuid())
  targetType     AdvertisementTargetType // ENUM: HOSPITAL, DOCTOR, HEALTH_APP
  targetId       String             // ID of the target (hospital, doctor, or health app)
  hospital       Hospital?          @relation(fields: [targetId], references: [id], onDelete: Cascade) // Optional
  doctor         Doctor?            @relation(fields: [targetId], references: [id], onDelete: Cascade)   // Optional
  healthApp      HealthApp?         @relation(fields: [targetId], references: [id], onDelete: Cascade)   // Optional
  adType         AdvertisementType   // ENUM: FEATURED, BANNER, SPONSORED
  position       Int                // Ranking position (1, 2, 3, etc.)
  price          Float              // Amount paid for the ad
  startDate      DateTime           // When the ad starts
  endDate        DateTime           // When the ad expires
  clickUrl       String?            // URL to redirect to when clicked
  imageUrl       String?            // URL to the image of the ad
  status         AdvertisementStatus @default(PENDING) // ENUM: PENDING, ACTIVE, EXPIRED, REJECTED
  createdAt      DateTime           @default(now())
  updatedAt      DateTime           @updatedAt
  impressions    Int                 @default(0) // Number of times the ad was shown
  clicks         Int                 @default(0) // Number of times the ad was clicked

  @@unique([targetType, targetId])
}

enum AdvertisementTargetType {
  HOSPITAL
  DOCTOR
  HEALTH_APP
}

enum AdvertisementType {
  FEATURED
  BANNER
  SPONSORED
}

enum AdvertisementStatus {
  PENDING
  ACTIVE  // Ad is running
  EXPIRED // Ad end date has passed
  REJECTED // Ad was rejected by admin
}

model AdPricing {
  id        String             @id @default(cuid())
  adType    AdvertisementType
  position  Int
  price     Float
  targetType AdvertisementTargetType
  startDate DateTime? // Optional: For time-based pricing changes
  endDate   DateTime?   // Optional: For time-based pricing changes
}

model AdvertisementTransaction {
  id          String             @id @default(cuid())
  adId        String
  ad          Advertisement      @relation(fields: [adId], references: [id], onDelete: Cascade)
  amount      Float
  paymentMethod String
  status      String             // PENDING, COMPLETED, FAILED
  transactionId String? // ID from the payment gateway
  createdAt   DateTime           @default(now())
}

model Hospital { /* ... */ }
model Doctor { /* ... */ }
model HealthApp { /* ... */ }
```

**4. Ad Types**

* **Featured:** Prominent placement, often at the top of search results or on the homepage.
* **Banner:** Displayed in designated banner areas on the website or app.
* **Sponsored:** Integrated seamlessly within the content, often labeled as "Sponsored."

**5. Ad Pricing Models**

* **Static Pricing:** Fixed prices for each ad type and position, defined in the `AdPricing` table.
* **Dynamic Pricing (Future):** Prices fluctuate based on demand, competition, and other factors.  Requires a more complex algorithm.

**6. Ad Management Workflow**

**6.1 Admin Panel**

* **Ad Pricing Management:** CRUD operations for `AdPricing`, including setting prices for each `targetType`, `adType`, and `position`.
* **Ad Management:**
    * View, approve, reject, and manage all ads.
    * Filter and search ads by various criteria.
    * View ad performance metrics (impressions, clicks).
    * Generate reports on ad revenue, impressions, and click-through rates.
* **User Management:** Manage hospitals, doctors, and health apps (if not already existing).

**6.2 Target Dashboard (Hospital/Doctor/Health App)**

* **Ad Creation/Renewal:**
    * View available ad slots and pricing.
    * Select `adType`, `position`, and duration (`startDate`, `endDate`).
    * Upload ad image (`imageUrl`).
    * Provide `clickUrl`.
    * Submit ad request (status: `PENDING`).
* **Ad Status Tracking:** View the status of their ads.
* **Payment Integration:**
    * Initiate payment through integrated payment gateways.
    * Upon successful payment, create `AdvertisementTransaction` and update `Advertisement` status to `ACTIVE`.
* **Ad Performance Tracking:** View impressions and clicks for their ads.
* **Ad History:** View past ad campaigns and payment history.

**7. Ad Display Logic**

1. **Fetch Active Ads:** Retrieve ads where `status` is `ACTIVE` and `endDate` is in the future.
2. **Filter by Target Type:** Retrieve ads for the current context (e.g., hospital page: `targetType = HOSPITAL`).
3. **Sort Featured Ads:** Sort by `position` (ascending) and then by `price` (descending).
4. **Fetch Regular Listings:** Retrieve entities (hospitals, doctors, health apps) without active ads.
5. **Sort Regular Listings:** Sort by relevant criteria (e.g., name, rating).
6. **Combine and Display:** Combine featured ads and regular listings.
7. **Ad Rotation:** Implement a rotation mechanism for ads in the same position (e.g., random, weighted).

**8. API Endpoints**

* **Admin:**
    * `/admin/ad-pricing`: CRUD operations for `AdPricing`.
    * `/admin/ads`: Get all ads (with filtering and pagination).
    * `/admin/ads/{id}/approve`: Approve an ad.
    * `/admin/ads/{id}/reject`: Reject an ad.
    * `/admin/reports/ads`: Generate ad reports.
* **Target:**
    * `/ads/available-slots/{targetType}`: Get available slots and pricing.
    * `/ads`: Create a new ad request.
    * `/ads/me`: Get ads for the current user.
    * `/ads/{id}/pay`: Process payment for an ad.
    * `/ads/{id}/metrics`: Get ad performance metrics.

**9. Technical Considerations**

* **Database Optimization:** Index relevant fields.
* **Caching:** Cache ad pricing and active ads.
* **Scalability:** Design for a large number of entities and ads.
* **Security:** Implement authentication and authorization.
* **Payment Gateway Integration:** Use a reliable library (e.g., Stripe, PayPal).
* **Image Storage:** Use cloud storage (e.g., AWS S3, Cloudinary).
* **Email Notifications:** Send notifications for ad approvals, rejections, expirations, and renewals.
* **Real-time Updates (Optional):** Use WebSockets or Server-Sent Events for real-time ad status updates.
* **Analytics:** Integrate with an analytics platform to track ad performance.

**10. Frontend Considerations**

* **Image Upload:** User-friendly image upload for ad creation.
* **Dynamic Forms:** Adapt forms based on `targetType`.
* **Ad Display Components:** Reusable components for displaying ads.
* **Payment Integration:** Securely handle payment process.
* **Reporting Dashboards:** Display performance metrics to advertisers.

**11. Future Enhancements**

* **Dynamic Pricing:** Implement dynamic pricing models.
* **Advanced Targeting:** Allow targeting by demographics, location, interests, etc.
* **Retargeting:** Target users who have previously interacted with the platform.
* **A/B Testing:** Allow advertisers to test different ad creatives.
* **Programmatic Advertising:** Integrate with ad exchanges for automated ad buying and selling.
* **Video Ads:** Support video ads.

**12. Legal Considerations**

* Ensure compliance with relevant advertising regulations (e.g., truth in advertising, data privacy).
* Have clear terms and conditions for advertisers.

This comprehensive documentation provides a solid foundation for your advertisement feature. Remember to tailor it to your specific needs and iterate on it as your project evolves.  This detailed version includes more information about ad types, pricing models, detailed workflows, API endpoints, and technical/frontend considerations.  It also touches on future enhancements and legal aspects.
