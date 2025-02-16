function Input() {
  return (
    <>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-8 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white mt-2"
        placeholder="Enter blog post title"
      />
      <div className="flex justify-start items-center gap-2 mt-2">
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <p className="flex justify-start items-center gap-1">
            <span>Slug </span>
            <span>/ </span>
          </p>
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          className="w-full bg-transparent outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white text-sm font-medium"
          placeholder="enter-blog-post-slug"
        />
      </div>
    </>
  );
}

export default Input;
