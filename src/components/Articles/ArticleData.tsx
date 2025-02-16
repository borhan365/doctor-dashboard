const articleOne = '../../images/product/product-01.png'
const articleTwo = '../../images/product/product-02.png'
const articleThree = '../../images/product/product-03.png'
const articleFour = '../../images/product/product-04.png'

const articleFive = '../../images/cards/cards-03.png'
const articleSix = '../../images/cards/cards-01.png'
const articleSeven = '../../images/task/task-01.jpg'

const articleData = [
  {
    en: {
      id: 1,
      title: "Understanding React Hooks",
      description: "An in-depth look at React Hooks and how to use them effectively.",
      category: "React",
      author: "John Doe",
      status: "Published",
      thumbnail: articleOne
    },
    bn: {
      id: 1,
      title: "রিঅ্যাক্ট হুকস বুঝুন",
      description: "রিঅ্যাক্ট হুকস এবং সেগুলি কার্যকরভাবে কীভাবে ব্যবহার করবেন তার গভীর আলোচনা।",
      category: "রিঅ্যাক্ট",
      author: "জন ডো",
      status: "প্রকাশিত",
      thumbnail: articleOne
    }
  },
  {
    en: {
      id: 2,
      title: "Mastering JavaScript ES6",
      description: "A comprehensive guide to understanding JavaScript ES6 features.",
      category: "JavaScript",
      author: "Jane Smith",
      status: "Published",
      thumbnail: articleTwo
    },
    bn: {
      id: 2,
      title: "জাভাস্ক্রিপ্ট ES6 আয়ত্ত করুন",
      description: "জাভাস্ক্রিপ্ট ES6 এর বৈশিষ্ট্যগুলি বোঝার জন্য একটি বিস্তৃত নির্দেশিকা।",
      category: "জাভাস্ক্রিপ্ট",
      author: "জেন স্মিথ",
      status: "প্রকাশিত",
      thumbnail: articleTwo
    }
  },
  {
    en: {
      id: 3,
      title: "CSS Grid vs Flexbox",
      description: "A comparison of CSS Grid and Flexbox for modern web design.",
      category: "CSS",
      author: "Alex Johnson",
      status: "Published",
      thumbnail: articleThree
    },
    bn: {
      id: 3,
      title: "CSS গ্রিড বনাম ফ্লেক্সবক্স",
      description: "আধুনিক ওয়েব ডিজাইনের জন্য CSS গ্রিড এবং ফ্লেক্সবক্সের তুলনা।",
      category: "CSS",
      author: "অ্যালেক্স জনসন",
      status: "প্রকাশিত",
      thumbnail: articleThree
    }
  },
  {
    en: {
      id: 4,
      title: "Building REST APIs with Node.js",
      description: "Learn how to create scalable RESTful APIs using Node.js.",
      category: "Node.js",
      author: "Emily Brown",
      status: "Draft",
      thumbnail: articleFour
    },
    bn: {
      id: 4,
      title: "Node.js দিয়ে REST API তৈরি করুন",
      description: "Node.js ব্যবহার করে কিভাবে স্কেলযোগ্য RESTful API তৈরি করবেন তা শিখুন।",
      category: "Node.js",
      author: "এমিলি ব্রাউন",
      status: "খসড়া",
      thumbnail: articleFour
    }
  },
  {
    en: {
      id: 5,
      title: "Introduction to TypeScript",
      description: "A beginner's guide to TypeScript and its advantages over JavaScript.",
      category: "TypeScript",
      author: "Michael Lee",
      status: "Published",
      thumbnail: articleOne
    },
    bn: {
      id: 5,
      title: "টাইপস্ক্রিপ্টের পরিচিতি",
      description: "টাইপস্ক্রিপ্ট এবং এর জাভাস্ক্রিপ্টের উপর সুবিধার জন্য একটি প্রাথমিক নির্দেশিকা।",
      category: "টাইপস্ক্রিপ্ট",
      author: "মাইকেল লি",
      status: "প্রকাশিত",
      thumbnail: articleOne
    }
  },
  {
    en: {
      id: 6,
      title: "Web Accessibility: Best Practices",
      description: "Explore the best practices for building accessible websites.",
      category: "Web Development",
      author: "Sophia Wilson",
      status: "Published",
      thumbnail: articleTwo
    },
    bn: {
      id: 6,
      title: "ওয়েব অ্যাক্সেসিবিলিটি: সেরা অনুশীলন",
      description: "অ্যাক্সেসযোগ্য ওয়েবসাইট তৈরির জন্য সেরা অনুশীলনগুলি অন্বেষণ করুন।",
      category: "ওয়েব ডেভেলপমেন্ট",
      author: "সোফিয়া উইলসন",
      status: "প্রকাশিত",
      thumbnail: articleTwo
    }
  },
  {
    en: {
      id: 7,
      title: "Learning Vue.js in 2024",
      description: "An updated guide to learning Vue.js for building interactive web apps.",
      category: "Vue.js",
      author: "David Clark",
      status: "Draft",
      thumbnail: articleThree
    },
    bn: {
      id: 7,
      title: "২০২৪ সালে Vue.js শিখুন",
      description: "ইন্টারেক্টিভ ওয়েব অ্যাপ তৈরি করতে Vue.js শেখার একটি আপডেটেড নির্দেশিকা।",
      category: "Vue.js",
      author: "ডেভিড ক্লার্ক",
      status: "খসড়া",
      thumbnail: articleThree
    }
  },
  {
    en: {
      id: 8,
      title: "GraphQL vs REST",
      description: "A deep dive into the differences between GraphQL and REST APIs.",
      category: "APIs",
      author: "Lisa Adams",
      status: "Published",
      thumbnail: articleFour
    },
    bn: {
      id: 8,
      title: "GraphQL বনাম REST",
      description: "GraphQL এবং REST API-এর মধ্যে পার্থক্যগুলির একটি গভীর বিশ্লেষণ।",
      category: "API",
      author: "লিসা অ্যাডামস",
      status: "প্রকাশিত",
      thumbnail: articleFour
    }
  },
  {
    en: {
      id: 9,
      title: "The Future of JAMstack",
      description: "How JAMstack architecture is revolutionizing web development.",
      category: "Web Development",
      author: "Robert Miller",
      status: "Published",
      thumbnail: articleFive
    },
    bn: {
      id: 9,
      title: "JAMstack এর ভবিষ্যত",
      description: "কিভাবে JAMstack আর্কিটেকচার ওয়েব ডেভেলপমেন্টে বিপ্লব ঘটাচ্ছে।",
      category: "ওয়েব ডেভেলপমেন্ট",
      author: "রবার্ট মিলার",
      status: "প্রকাশিত",
      thumbnail: articleFive
    }
  },
  {
    en: {
      id: 10,
      title: "Using Docker for DevOps",
      description: "Learn how Docker can streamline your DevOps workflow.",
      category: "DevOps",
      author: "Charles Thomas",
      status: "Published",
      thumbnail: articleSix
    },
    bn: {
      id: 10,
      title: "ডেভঅপসের জন্য Docker ব্যবহার করা",
      description: "Docker কীভাবে আপনার DevOps ওয়ার্কফ্লোকে সহজ করতে পারে তা শিখুন।",
      category: "ডেভঅপস",
      author: "চার্লস থমাস",
      status: "প্রকাশিত",
      thumbnail: articleSix
    }
  },
  {
    en: {
      id: 11,
      title: "Understanding Microservices Architecture",
      description: "A comprehensive guide to microservices and how they work.",
      category: "Architecture",
      author: "Jessica Davis",
      status: "Draft",
      thumbnail: articleSeven
    },
    bn: {
      id: 11,
      title: "মাইক্রোসার্ভিস আর্কিটেকচার বোঝা",
      description: "মাইক্রোসার্ভিস এবং সেগুলি কীভাবে কাজ করে তার একটি বিস্তৃত নির্দেশিকা।",
      category: "আর্কিটেকচার",
      author: "জেসিকা ডেভিস",
      status: "খসড়া",
      thumbnail: articleSeven
    }
  },
]

export default articleData; 