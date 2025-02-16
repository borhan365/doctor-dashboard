src/
├── lib/
│   ├── config/
│   │   └── s3.ts                 # S3 client configuration
│   │
│   ├── errors/
│   │   └── upload.ts             # Custom error handling
│   │
│   ├── utils/
│   │   └── image.ts              # Image processing utilities
│   │
│   ├── validation/
│   │   └── upload.ts             # Zod schemas for validation
│   │
│   └── types/
│       └── upload.ts             # TypeScript interfaces and types
│
├── hooks/
│   └── useUpload.ts              # Custom upload hook for client-side
│
├── middleware.ts                  # Auth and rate limiting middleware
│
└── app/
    └── api/
        └── uploads/
            ├── _middleware.ts     # Route-specific middleware
            │
            ├── users/
            │   ├── create/
            │   │   └── route.ts   # Single upload
            │   ├── bulk-create/
            │   │   └── route.ts   # Multiple upload
            │   ├── [id]/
            │   │   ├── route.ts   # GET handler
            │   │   └── delete/
            │   │       └── route.ts
            │   ├── get-all/
            │   │   └── route.ts
            │   └── delete-all/
            │       └── route.ts
            │
            ├── locations/
            │   ├── create/
            │   │   └── route.ts
            │   ├── bulk-create/
            │   │   └── route.ts
            │   ├── [id]/
            │   │   ├── route.ts
            │   │   └── delete/
            │   │       └── route.ts
            │   ├── get-all/
            │   │   └── route.ts
            │   └── delete-all/
            │       └── route.ts
            │
            ├── blogs/
            │   ├── create/
            │   │   └── route.ts
            │   ├── bulk-create/
            │   │   └── route.ts
            │   ├── [id]/
            │   │   ├── route.ts
            │   │   └── delete/
            │   │       └── route.ts
            │   ├── get-all/
            │   │   └── route.ts
            │   └── delete-all/
            │       └── route.ts
            │
            ├── pages/
            │   ├── create/
            │   │   └── route.ts
            │   ├── bulk-create/
            │   │   └── route.ts
            │   ├── [id]/
            │   │   ├── route.ts
            │   │   └── delete/
            │   │       └── route.ts
            │   ├── get-all/
            │   │   └── route.ts
            │   └── delete-all/
            │       └── route.ts
            │
            ├── testimonials/
            │   ├── create/
            │   │   └── route.ts
            │   ├── bulk-create/
            │   │   └── route.ts
            │   ├── [id]/
            │   │   ├── route.ts
            │   │   └── delete/
            │   │       └── route.ts
            │   ├── get-all/
            │   │   └── route.ts
            │   └── delete-all/
            │       └── route.ts
            │
            └── others/
                ├── create/
                │   └── route.ts
                ├── bulk-create/
                │   └── route.ts
                ├── [id]/
                │   ├── route.ts
                │   └── delete/
                │       └── route.ts
                ├── get-all/
                │   └── route.ts
                └── delete-all/
                    └── route.ts