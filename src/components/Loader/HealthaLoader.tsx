function HealthaLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-boxdark/80">
      <div className="healtha-loader-wrapper">
        <svg className="healtha-loader-svg" viewBox="0 0 800 100">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3c50e0" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            dy=".35em"
            textAnchor="middle"
            className="healtha-text-stroke"
          >
            <tspan className="letter">H</tspan>
            <tspan className="letter">e</tspan>
            <tspan className="letter">a</tspan>
            <tspan className="letter">l</tspan>
            <tspan className="letter">t</tspan>
            <tspan className="letter">h</tspan>
            <tspan className="letter">a</tspan>
            <tspan className="letter">.</tspan>
            <tspan className="letter">i</tspan>
            <tspan className="letter">o</tspan>
          </text>
          <text
            x="50%"
            y="50%"
            dy=".35em"
            textAnchor="middle"
            className="healtha-text-fill"
          >
            <tspan className="letter">H</tspan>
            <tspan className="letter">e</tspan>
            <tspan className="letter">a</tspan>
            <tspan className="letter">l</tspan>
            <tspan className="letter">t</tspan>
            <tspan className="letter">h</tspan>
            <tspan className="letter">a</tspan>
            <tspan className="letter">.</tspan>
            <tspan className="letter">i</tspan>
            <tspan className="letter">o</tspan>
          </text>
        </svg>
      </div>
    </div>
  );
}

export default HealthaLoader;
