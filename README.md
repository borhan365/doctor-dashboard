This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
healtha-project
├─ .cursorrules
├─ .env
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     └─ heads
│  │        └─ master
│  ├─ objects
│  │  ├─ 02
│  │  │  └─ 1c39379d298a783317a256f478e679d3c60ddc
│  │  ├─ 13
│  │  │  └─ d40b892057e0e4271c5c8f9fc8db30e80f2409
│  │  ├─ 17
│  │  │  └─ 8007f11e8814f601f1cd59ee6867bdd70576ac
│  │  ├─ 1a
│  │  │  └─ 69fd2a450afc3bf47e08b22c149190df0ffdb4
│  │  ├─ 1b
│  │  │  └─ 62daacff96dad6584e71cd962051b82957c313
│  │  ├─ 37
│  │  │  └─ 224185490e6db2d26a574d66d4d476336bf644
│  │  ├─ 46
│  │  │  └─ 78774e6d606704bce1897a5dab960cd798bf66
│  │  ├─ 63
│  │  │  └─ c369080c54f3a463ff5a3ccb090be4e5f382a1
│  │  ├─ 6f
│  │  │  └─ e62d19b42eddd6326cfd46829c3501e4e5debc
│  │  ├─ 71
│  │  │  └─ 8d6fea4835ec2d246af9800eddb7ffb276240c
│  │  ├─ 73
│  │  │  └─ a05f999ed536969ab4544f257774f879b87088
│  │  ├─ 7b
│  │  │  └─ 2858930495fc4a76d7a51d958bacf2d64eb81f
│  │  ├─ 84
│  │  │  └─ c570db967ba82b91048d1ff0428e2ab22ee634
│  │  ├─ a3
│  │  │  └─ 6cde01c60b91e16e4c976d00546686e2d4e470
│  │  ├─ c5
│  │  │  └─ 6e5934930eac016c1740fc39bdba0ddaa66a8b
│  │  ├─ e2
│  │  │  └─ 15bc4ccf138bbc38ad58ad57e92135484b3c0f
│  │  ├─ e9
│  │  │  └─ 9a883254cb0661116adc19cfc8572df185501c
│  │  ├─ f2
│  │  │  └─ ae185cbfd16946a534d819e9eb03924abbcc49
│  │  ├─ fc
│  │  │  └─ b741a341df889205f9868e01cdef51cc530ae9
│  │  ├─ fd
│  │  │  └─ 3dbb571a12a1c3baf000db049e141c888d05a8
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ master
│     └─ tags
├─ .gitignore
├─ LICENSE
├─ next.config.js
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ postcss.config.mjs
├─ prettier.config.js
├─ prisma
│  ├─ migrations
│  │  ├─ 20240928041852_init
│  │  │  └─ migration.sql
│  │  ├─ 20240928114345_updateuser
│  │  │  └─ migration.sql
│  │  ├─ 20240928155607_add_slug_to_category
│  │  │  └─ migration.sql
│  │  ├─ 20240929014229_newprojectsetup
│  │  │  └─ migration.sql
│  │  ├─ 20240929154040_update_category_model_and_fields
│  │  │  └─ migration.sql
│  │  ├─ 20240930065529_add_featured_image_to_category
│  │  │  └─ migration.sql
│  │  ├─ 20241001022301_add_file_info_to_category
│  │  │  └─ migration.sql
│  │  ├─ 20241001145258_change_iamge_and_others_fields
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ images
│  │  ├─ best-value-banner.png
│  │  ├─ brand
│  │  │  ├─ brand-01.svg
│  │  │  ├─ brand-02.svg
│  │  │  ├─ brand-03.svg
│  │  │  ├─ brand-04.svg
│  │  │  └─ brand-05.svg
│  │  ├─ cards
│  │  │  ├─ cards-01.png
│  │  │  ├─ cards-02.png
│  │  │  ├─ cards-03.png
│  │  │  ├─ cards-04.png
│  │  │  ├─ cards-05.png
│  │  │  └─ cards-06.png
│  │  ├─ country
│  │  │  ├─ country-01.svg
│  │  │  ├─ country-02.svg
│  │  │  ├─ country-03.svg
│  │  │  ├─ country-04.svg
│  │  │  ├─ country-05.svg
│  │  │  └─ country-06.svg
│  │  ├─ cover
│  │  │  └─ cover-01.png
│  │  ├─ favicon.ico
│  │  ├─ icon
│  │  │  ├─ icon-arrow-down.svg
│  │  │  ├─ icon-calendar.svg
│  │  │  ├─ icon-copy-alt.svg
│  │  │  ├─ icon-moon.svg
│  │  │  └─ icon-sun.svg
│  │  ├─ illustration
│  │  │  ├─ illustration-01.svg
│  │  │  ├─ illustration-02.svg
│  │  │  ├─ illustration-03.svg
│  │  │  └─ illustration-04.svg
│  │  ├─ logo
│  │  │  ├─ logo-dark.svg
│  │  │  ├─ logo-icon.svg
│  │  │  └─ logo.svg
│  │  ├─ product
│  │  │  ├─ product-01.png
│  │  │  ├─ product-02.png
│  │  │  ├─ product-03.png
│  │  │  ├─ product-04.png
│  │  │  └─ product-thumb.png
│  │  ├─ task
│  │  │  └─ task-01.jpg
│  │  ├─ uploads
│  │  └─ user
│  │     ├─ user-01.png
│  │     ├─ user-02.png
│  │     ├─ user-03.png
│  │     ├─ user-04.png
│  │     ├─ user-05.png
│  │     ├─ user-06.png
│  │     ├─ user-07.png
│  │     ├─ user-08.png
│  │     ├─ user-09.png
│  │     ├─ user-10.png
│  │     ├─ user-11.png
│  │     ├─ user-12.png
│  │     └─ user-13.png
│  └─ uploads
│     ├─ categories
│     │  ├─ featuredImage-1727795833091.png
│     │  ├─ featuredImage-1727798143579.png
│     │  ├─ featuredImage-1727873940094.webp
│     │  ├─ featuredImage-1727887567452.png
│     │  ├─ featuredImage-1727887583166.png
│     │  ├─ thumbnail-1727795833088.png
│     │  ├─ thumbnail-1727798067097.png
│     │  ├─ thumbnail-1727798143577.png
│     │  ├─ thumbnail-1727800560239.jpg
│     │  ├─ thumbnail-1727801163965.jpg
│     │  ├─ thumbnail-1727801234122.png
│     │  ├─ thumbnail-1727801429525.jpeg
│     │  ├─ thumbnail-1727801560228.png
│     │  ├─ thumbnail-1727801705396.png
│     │  ├─ thumbnail-1727801777472.png
│     │  ├─ thumbnail-1727873940092.jpg
│     │  └─ thumbnail-1727874491857.jpg
│     └─ users
│        ├─ thumbnail-1727576341440.png
│        └─ thumbnail-1727576871504.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  ├─ articles
│  │  │  │  └─ categories
│  │  │  │     ├─ bulk-delete
│  │  │  │     │  └─ route.ts
│  │  │  │     ├─ create
│  │  │  │     │  └─ route.ts
│  │  │  │     ├─ route.ts
│  │  │  │     ├─ [...slug]
│  │  │  │     │  └─ route.tsx
│  │  │  │     └─ [slug]
│  │  │  │        └─ route.ts
│  │  │  └─ users
│  │  │     ├─ bulk-delete
│  │  │     │  └─ route.ts
│  │  │     ├─ create
│  │  │     │  └─ route.ts
│  │  │     ├─ route.ts
│  │  │     └─ [id]
│  │  │        └─ route.ts
│  │  ├─ articles
│  │  │  ├─ categories
│  │  │  │  ├─ create
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ [...slug]
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ [slug]
│  │  │  │     └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ auth
│  │  │  ├─ signin
│  │  │  │  └─ page.tsx
│  │  │  └─ signup
│  │  │     ├─ layout.tsx
│  │  │     └─ page.tsx
│  │  ├─ calendar
│  │  │  └─ page.tsx
│  │  ├─ chart
│  │  │  └─ page.tsx
│  │  ├─ dashboard
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ profile
│  │  │  └─ page.tsx
│  │  ├─ settings
│  │  │  └─ page.tsx
│  │  ├─ tables
│  │  │  └─ page.tsx
│  │  ├─ ui
│  │  │  ├─ alerts
│  │  │  │  └─ page.tsx
│  │  │  └─ buttons
│  │  │     └─ page.tsx
│  │  └─ users
│  │     ├─ create
│  │     │  └─ page.tsx
│  │     ├─ page.tsx
│  │     └─ [id]
│  │        └─ page.tsx
│  ├─ components
│  │  ├─ Articles
│  │  │  ├─ ArticleData.tsx
│  │  │  └─ SEOMetaSection.tsx
│  │  ├─ Breadcrumbs
│  │  │  └─ Breadcrumb.tsx
│  │  ├─ Buttons
│  │  │  ├─ DangerButton.tsx
│  │  │  └─ PrimaryButton.tsx
│  │  ├─ Calender
│  │  │  └─ index.tsx
│  │  ├─ CardDataStats.tsx
│  │  ├─ Charts
│  │  │  ├─ ChartOne.tsx
│  │  │  ├─ ChartThree.tsx
│  │  │  ├─ ChartTwo.tsx
│  │  │  └─ page.tsx
│  │  ├─ Chat
│  │  │  └─ ChatCard.tsx
│  │  ├─ Checkboxes
│  │  │  ├─ CheckboxFive.tsx
│  │  │  ├─ CheckboxFour.tsx
│  │  │  ├─ CheckboxOne.tsx
│  │  │  ├─ CheckboxThree.tsx
│  │  │  └─ CheckboxTwo.tsx
│  │  ├─ ClickOutside.tsx
│  │  ├─ ClientLayout.tsx
│  │  ├─ common
│  │  │  ├─ ConfirmModal.tsx
│  │  │  ├─ Errors
│  │  │  ├─ Loader
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ PostLoading.tsx
│  │  │  └─ Messages
│  │  │     └─ errorMessage.tsx
│  │  ├─ Dashboard
│  │  │  └─ E-commerce.tsx
│  │  ├─ Dropdowns
│  │  │  └─ DropdownDefault.tsx
│  │  ├─ FormElements
│  │  │  ├─ DatePicker
│  │  │  │  ├─ DatePickerOne.tsx
│  │  │  │  └─ DatePickerTwo.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ MultiSelect.tsx
│  │  ├─ Globals
│  │  │  ├─ AffiliateCheckBox.tsx
│  │  │  ├─ AuthorBox.tsx
│  │  │  ├─ CategoryBox.tsx
│  │  │  ├─ CheckBoxes.tsx
│  │  │  ├─ DateBox.tsx
│  │  │  ├─ ExcerptBox.tsx
│  │  │  ├─ FeaturedCheckBox.tsx
│  │  │  ├─ Input.tsx
│  │  │  ├─ ParentCategoryBox.tsx
│  │  │  ├─ PostStatusBox.tsx
│  │  │  ├─ SponsoredCheckBox.tsx
│  │  │  ├─ SubTitleBox.tsx
│  │  │  ├─ TextEditor.tsx
│  │  │  ├─ ThumbnailBox.tsx
│  │  │  └─ TitleBox.tsx
│  │  ├─ Header
│  │  │  ├─ DarkModeSwitcher.tsx
│  │  │  ├─ DropdownMessage.tsx
│  │  │  ├─ DropdownNotification.tsx
│  │  │  ├─ DropdownUser.tsx
│  │  │  └─ index.tsx
│  │  ├─ Inputs
│  │  │  └─ SelectBox.tsx
│  │  ├─ Layouts
│  │  │  └─ DefaultLayout.tsx
│  │  ├─ Maps
│  │  │  └─ MapOne.tsx
│  │  ├─ Media
│  │  │  └─ MediaData.tsx
│  │  ├─ SelectGroup
│  │  │  ├─ SelectGroupOne.tsx
│  │  │  └─ SelectGroupTwo.tsx
│  │  ├─ Sidebar
│  │  │  ├─ index.tsx
│  │  │  ├─ SidebarDropdown.tsx
│  │  │  ├─ SidebarItem.tsx
│  │  │  └─ SidebarLinkGroup.tsx
│  │  ├─ Switchers
│  │  │  ├─ SwitcherFour.tsx
│  │  │  ├─ SwitcherOne.tsx
│  │  │  ├─ SwitcherThree.tsx
│  │  │  └─ SwitcherTwo.tsx
│  │  └─ Tables
│  │     ├─ TableFour.tsx
│  │     ├─ TableOne.tsx
│  │     ├─ TableThree.tsx
│  │     └─ TableTwo.tsx
│  ├─ css
│  │  ├─ satoshi.css
│  │  └─ style.css
│  ├─ fonts
│  │  ├─ Satoshi-Black.eot
│  │  ├─ Satoshi-Black.ttf
│  │  ├─ Satoshi-Black.woff
│  │  ├─ Satoshi-Black.woff2
│  │  ├─ Satoshi-BlackItalic.eot
│  │  ├─ Satoshi-BlackItalic.ttf
│  │  ├─ Satoshi-BlackItalic.woff
│  │  ├─ Satoshi-BlackItalic.woff2
│  │  ├─ Satoshi-Bold.eot
│  │  ├─ Satoshi-Bold.ttf
│  │  ├─ Satoshi-Bold.woff
│  │  ├─ Satoshi-Bold.woff2
│  │  ├─ Satoshi-BoldItalic.eot
│  │  ├─ Satoshi-BoldItalic.ttf
│  │  ├─ Satoshi-BoldItalic.woff
│  │  ├─ Satoshi-BoldItalic.woff2
│  │  ├─ Satoshi-Italic.eot
│  │  ├─ Satoshi-Italic.ttf
│  │  ├─ Satoshi-Italic.woff
│  │  ├─ Satoshi-Italic.woff2
│  │  ├─ Satoshi-Light.eot
│  │  ├─ Satoshi-Light.ttf
│  │  ├─ Satoshi-Light.woff
│  │  ├─ Satoshi-Light.woff2
│  │  ├─ Satoshi-LightItalic.eot
│  │  ├─ Satoshi-LightItalic.ttf
│  │  ├─ Satoshi-LightItalic.woff
│  │  ├─ Satoshi-LightItalic.woff2
│  │  ├─ Satoshi-Medium.eot
│  │  ├─ Satoshi-Medium.ttf
│  │  ├─ Satoshi-Medium.woff
│  │  ├─ Satoshi-Medium.woff2
│  │  ├─ Satoshi-MediumItalic.eot
│  │  ├─ Satoshi-MediumItalic.ttf
│  │  ├─ Satoshi-MediumItalic.woff
│  │  ├─ Satoshi-MediumItalic.woff2
│  │  ├─ Satoshi-Regular.eot
│  │  ├─ Satoshi-Regular.ttf
│  │  ├─ Satoshi-Regular.woff
│  │  ├─ Satoshi-Regular.woff2
│  │  ├─ Satoshi-Variable.eot
│  │  ├─ Satoshi-Variable.ttf
│  │  ├─ Satoshi-Variable.woff
│  │  ├─ Satoshi-Variable.woff2
│  │  ├─ Satoshi-VariableItalic.eot
│  │  ├─ Satoshi-VariableItalic.ttf
│  │  ├─ Satoshi-VariableItalic.woff
│  │  └─ Satoshi-VariableItalic.woff2
│  ├─ hooks
│  │  ├─ useColorMode.tsx
│  │  └─ useLocalStorage.tsx
│  ├─ js
│  │  └─ us-aea-en.js
│  ├─ lib
│  │  ├─ auth.ts
│  │  └─ prisma.ts
│  ├─ pages
│  │  └─ Home
│  │     └─ page.tsx
│  └─ types
│     ├─ brand.ts
│     ├─ cards.ts
│     ├─ chat.ts
│     ├─ country.ts
│     ├─ faq.ts
│     ├─ faqItem.ts
│     ├─ Lead.ts
│     ├─ package.ts
│     └─ product.ts
├─ tailwind.config.ts
└─ tsconfig.json

```