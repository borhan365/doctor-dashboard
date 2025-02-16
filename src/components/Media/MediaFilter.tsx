import { Grid, List, Search, Upload } from "lucide-react";

function MediaFilter({
  viewMode,
  setViewMode,
  mediaType,
  setMediaType,
  imageType,
  setImageType,
  dateFilter,
  setDateFilter,
  searchQuery,
  setSearchQuery,
  fileInputRef,
  handleFileChange,
  uploadNewFileHandler,
}: {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  mediaType: string;
  setMediaType: (type: string) => void;
  imageType: string;
  setImageType: (type: string) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadNewFileHandler: () => void;
}) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        {/* view mode */}
        <div className="flex items-center justify-between gap-3">
          <button
            className={`rounded p-2 ${
              viewMode === "grid" ? "bg-slate-50" : "bg-transparent"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="size-6" />
          </button>
          <button
            className={`rounded p-2 ${
              viewMode === "list" ? "bg-slate-50" : "bg-transparent"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="size-6" />
          </button>

          {/* select media */}
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            className="rounded-md border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
          >
            <option value="All">All File Types</option>
            <option value="image">Image</option>
            <option value="application/pdf">PDF</option>
            <option value="application/msword">Docs</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>

          {/* select image type */}
          <select
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
            className="rounded-md border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
          >
            <option value="All">All Image Types</option>
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
            <option value="webp">WEBP</option>
            <option value="svg">SVG</option>
            <option value="gif">GIF</option>
            <option value="bmp">BMP</option>
            <option value="tiff">TIFF</option>
          </select>

          {/* select date wise media */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-md border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
          >
            <option value="All">All Dates</option>
            <option value="2024/09">September 2024</option>
            <option value="2024/08">August 2024</option>
            <option value="2024/07">July 2024</option>
          </select>

          {/* search */}
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-slate-400" />
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-stroke p-2 pl-10 focus:outline-primary"
            />
          </div>
          <button
            onClick={() => {
              setViewMode("grid");
              setMediaType("All");
              setImageType("All");
              setDateFilter("All");
              setSearchQuery("");
            }}
            className="rounded border border-stroke px-4 py-2 hover:bg-slate-100"
          >
            Reset
          </button>
        </div>
        {/* upload button */}
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="*/*"
          />
          <button
            onClick={uploadNewFileHandler}
            className="flex items-center rounded bg-primary px-6 py-2 text-white hover:bg-primary"
          >
            <Upload className="mr-2 size-5" />
            Upload File
          </button>
        </div>
      </div>
    </>
  );
}

export default MediaFilter;
