import { useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  Upload,
  RotateCcw,
  MapPinned,
  Eye,
  Pencil,
} from "lucide-react";
import { toPng } from "html-to-image";

type Facing = "East" | "West" | "North" | "South";
type ExportFormat = "square" | "feed" | "story";
const EXPORT_FORMATS: Record<
  ExportFormat,
  { label: string; width: number; height: number }
> = {
  square: { label: "Square • 1080×1080", width: 1080, height: 1080 },
  feed: {
    label: "Instagram / Facebook Feed • 1080×1350",
    width: 1080,
    height: 1350,
  },
  story: {
    label: "WhatsApp / Instagram Status • 1080×1920",
    width: 1080,
    height: 1920,
  },
};
type Property = {
  brand: string;
  headline: string;
  location: string;
  landmark: string;
  distance: string;
  approval: string;
  width: number;
  length: number;
  facing: Facing;
  roadCount: number;
  roadWidth: number;
  sideRoadWidth: number;
  topRoad: string;
  bottomRoad: string;
  leftRoad: string;
  rightRoad: string;
  phone: string;
  footer: string;
};

const initial: Property = {
  brand: "JPS REAL ESTATE",
  headline: "இடம் விற்பனைக்கு உள்ளது",
  location: "சேலம் - ரெட்டிப்பட்டி",
  landmark: "அஸ்வா பார்க் ஹோட்டல்",
  distance: "புறத்திலிருந்து கற்றோடு 6வது பிளாட்",
  approval: "DTCP APPROVED",
  width: 28,
  length: 37,
  facing: "West",
  roadCount: 2,
  roadWidth: 33.5,
  sideRoadWidth: 0,
  topRoad: "உள்ளாட்சி சாலை",
  bottomRoad: "சாலை",
  leftRoad: "இடப்பக்கம் சாலை",
  rightRoad: "பக்கத்து நிலம்",
  phone: "93422 32214",
  footer: "வீடு கட்டவும் / முதலீட்டிற்கும் சிறந்த இடம்",
};

const area = (p: Property) =>
  Math.round(Math.max(0, p.width) * Math.max(0, p.length));

function SiteMap({ p }: { p: Property }) {
  const plotW = 150,
    plotH = 220,
    scale = Math.min(
      plotW / Math.max(p.width, 1),
      plotH / Math.max(p.length, 1),
    );
  const pw = p.width * scale,
    ph = p.length * scale,
    px = 160 - pw / 2,
    py = 190 - ph / 2;
  return (
    <svg
      className="site-map"
      viewBox="0 0 320 390"
      role="img"
      aria-label="Dynamic site map"
    >
      <line
        x1="25"
        y1={py}
        x2="295"
        y2={py}
        stroke="#555"
        strokeWidth="2"
        strokeDasharray="7 4"
      />
      <line
        x1="25"
        y1={py + ph}
        x2="295"
        y2={py + ph}
        stroke="#555"
        strokeWidth="2"
        strokeDasharray="7 4"
      />
      <rect
        x={px}
        y={py}
        width={pw}
        height={ph}
        fill="#fffdf4"
        stroke="#e0b800"
        strokeWidth="5"
      />
      <text
        x="160"
        y={py - 10}
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill="#20251f"
      >
        {p.width}′
      </text>
      <text
        x={px - 14}
        y={py + ph / 2}
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill="#20251f"
        transform={`rotate(-90 ${px - 14} ${py + ph / 2})`}
      >
        {p.length}′
      </text>
      <text
        x="160"
        y={py + ph + 25}
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill="#20251f"
      >
        {p.width}′
      </text>
      <text
        x={px - 48}
        y={py + ph / 2}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="#333"
        transform={`rotate(-90 ${px - 48} ${py + ph / 2})`}
      >
        {p.leftRoad}
      </text>
      <text
        x={px + pw + 48}
        y={py + ph / 2}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="#333"
        transform={`rotate(90 ${px + pw + 48} ${py + ph / 2})`}
      >
        {p.rightRoad}
      </text>
      <text
        x="160"
        y={py + ph + 48}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#20251f"
      >
        {p.bottomRoad}
      </text>
      <text
        x="160"
        y={py - 28}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#20251f"
      >
        {p.topRoad}
      </text>
      <text x="48" y={py + ph + 75} fontSize="11" fill="#333">
        {p.roadWidth}′
      </text>
      <text x="272" y={py + ph + 75} textAnchor="end" fontSize="11" fill="#333">
        {p.roadWidth}′
      </text>
      <g transform="translate(260 340)">
        <circle r="20" fill="#fff" stroke="#173d2b" strokeWidth="1" />
        <text
          x="0"
          y="-27"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#173d2b"
        >
          N
        </text>
        <text
          x="0"
          y="38"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#173d2b"
        >
          S
        </text>
        <text
          x="-28"
          y="5"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#173d2b"
        >
          W
        </text>
        <text
          x="28"
          y="5"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#173d2b"
        >
          E
        </text>
        <path d="M0,-16 L5,0 L0,16 L-5,0 Z" fill="#bd2525" />
      </g>
      <text x="20" y="375" fontSize="8" fill="#66736a">
        குறிப்பு: அளவுகள் அடி (Feet) இல்
      </text>
    </svg>
  );
}

function App() {
  const [p, setP] = useState<Property>(initial);
  const [logo, setLogo] = useState<string | null>(null);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [exporting, setExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("story");
  const [previewScale, setPreviewScale] = useState(1);
  const frameRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const totalArea = useMemo(() => area(p), [p]);
  const update = <K extends keyof Property>(key: K, value: Property[K]) =>
    setP((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const updateScale = () => {
      // Desktop preview scales the 1080px master poster to the available space.
      // Mobile keeps the poster at 100% width.
      if (window.innerWidth <= 800) {
        setPreviewScale(1);
        return;
      }
      const available = Math.max(280, frame.clientWidth - 4);
      setPreviewScale(Math.min(1, available / 1080));
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(frame);
    window.addEventListener("resize", updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    const poster = posterRef.current;
    if (!frame || !poster || window.innerWidth <= 800) return;
    const setHeight = () => {
      frame.style.height = `${poster.scrollHeight * previewScale + 12}px`;
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(poster);
    return () => ro.disconnect();
  }, [previewScale, p, logo]);

  const exportPng = async (format: ExportFormat = exportFormat) => {
    const node = document.getElementById("poster");
    if (!node || exporting) return;
    setExporting(true);
    const previousClass = node.className;
    const previousStyle = node.getAttribute("style");
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 150));
      const size = EXPORT_FORMATS[format];
      node.classList.remove("format-square", "format-feed", "format-story");
      node.classList.add(`format-${format}`);
      node.setAttribute("data-exporting", "true");
      node.style.width = `${size.width}px`;
      node.style.height = `${size.height}px`;
      node.style.maxWidth = `${size.width}px`;
      node.style.transform = "none";
      node.style.margin = "0";
      const dataUrl = await toPng(node, {
        cacheBust: true,
        width: size.width,
        height: size.height,
        pixelRatio: 1,
        backgroundColor: "#f8f5e9",
        style: {
          width: `${size.width}px`,
          height: `${size.height}px`,
          maxWidth: `${size.width}px`,
          margin: "0",
          transform: "none",
        },
      });
      const a = document.createElement("a");
      const safe = p.location.replace(/\s+/g, "-");
      a.download = `${safe}-${format}-${size.width}x${size.height}.png`;
      a.href = dataUrl;
      a.click();
    } catch (err) {
      console.error(err);
      alert("Export failed. Please try again.");
    } finally {
      node.className = previousClass;
      if (previousStyle === null) node.removeAttribute("style");
      else node.setAttribute("style", previousStyle);
      node.removeAttribute("data-exporting");
      setExporting(false);
    }
  };
  const reset = () => {
    setP(initial);
    setLogo(null);
  };
  const format = exportFormat;

  return (
    <main className="app">
      <div className="mobile-tabs">
        <button
          className={tab === "edit" ? "active" : ""}
          onClick={() => setTab("edit")}
        >
          <Pencil size={17} /> Details
        </button>
        <button
          className={tab === "preview" ? "active" : ""}
          onClick={() => setTab("preview")}
        >
          <Eye size={17} /> Preview
        </button>
      </div>

      <section className={`editor ${tab === "preview" ? "mobile-hidden" : ""}`}>
        <div className="editor-head">
          <div>
            <h1>Real Estate Ad Generator</h1>
            <p>Fill details on mobile or desktop</p>
          </div>
          <div className="head-actions">
            <button className="ghost" onClick={reset}>
              <RotateCcw size={16} /> Reset
            </button>
            <button
              className="primary head-export"
              disabled={exporting}
              onClick={() => exportPng()}
            >
              <Download size={16} /> {exporting ? "Exporting…" : "Export PNG"}
            </button>
          </div>
        </div>

        <details open>
          <summary>Basic information</summary>
          <div className="form-grid">
            <label>
              Brand
              <input
                value={p.brand}
                onChange={(e) => update("brand", e.target.value)}
              />
            </label>
            <label>
              Headline
              <input
                value={p.headline}
                onChange={(e) => update("headline", e.target.value)}
              />
            </label>
            <label>
              Location
              <input
                value={p.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </label>
            <label>
              Landmark
              <input
                value={p.landmark}
                onChange={(e) => update("landmark", e.target.value)}
              />
            </label>
            <label className="wide">
              Directions / distance
              <input
                value={p.distance}
                onChange={(e) => update("distance", e.target.value)}
              />
            </label>
            <label>
              Approval
              <input
                value={p.approval}
                onChange={(e) => update("approval", e.target.value)}
              />
            </label>
          </div>
        </details>

        <details open>
          <summary>Plot details</summary>
          <div className="form-grid">
            <label>
              Width (ft)
              <input
                inputMode="decimal"
                type="number"
                min="0"
                value={p.width}
                onChange={(e) => update("width", Number(e.target.value))}
              />
            </label>
            <label>
              Length (ft)
              <input
                inputMode="decimal"
                type="number"
                min="0"
                value={p.length}
                onChange={(e) => update("length", Number(e.target.value))}
              />
            </label>
            <label>
              Facing
              <select
                value={p.facing}
                onChange={(e) => update("facing", e.target.value as Facing)}
              >
                {(["East", "West", "North", "South"] as Facing[]).map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Road count
              <input
                inputMode="numeric"
                type="number"
                min="0"
                value={p.roadCount}
                onChange={(e) => update("roadCount", Number(e.target.value))}
              />
            </label>
            <label>
              Road width (ft)
              <input
                inputMode="decimal"
                type="number"
                min="0"
                value={p.roadWidth}
                onChange={(e) => update("roadWidth", Number(e.target.value))}
              />
            </label>
            <label>
              Side road width
              <input
                inputMode="decimal"
                type="number"
                min="0"
                value={p.sideRoadWidth}
                onChange={(e) =>
                  update("sideRoadWidth", Number(e.target.value))
                }
              />
            </label>
            <div className="area-pill">
              Calculated area <b>{totalArea.toLocaleString()} sq.ft</b>
            </div>
          </div>
        </details>

        <details open>
          <summary>Site map labels</summary>
          <div className="form-grid">
            <label>
              Top side
              <input
                value={p.topRoad}
                onChange={(e) => update("topRoad", e.target.value)}
              />
            </label>
            <label>
              Bottom side
              <input
                value={p.bottomRoad}
                onChange={(e) => update("bottomRoad", e.target.value)}
              />
            </label>
            <label>
              Left side
              <input
                value={p.leftRoad}
                onChange={(e) => update("leftRoad", e.target.value)}
              />
            </label>
            <label>
              Right side
              <input
                value={p.rightRoad}
                onChange={(e) => update("rightRoad", e.target.value)}
              />
            </label>
          </div>
        </details>

        <details open>
          <summary>Contact & branding</summary>
          <div className="form-grid">
            <label>
              Phone
              <input
                inputMode="tel"
                value={p.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </label>
            <label className="wide">
              Footer banner
              <input
                value={p.footer}
                onChange={(e) => update("footer", e.target.value)}
              />
            </label>
          </div>
        </details>

        <div className="export-options">
          <label>
            Download format
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
            >
              {Object.entries(EXPORT_FORMATS).map(([key, v]) => (
                <option key={key} value={key}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <small>
            Recommended: Status for WhatsApp / Instagram Stories, Feed for
            Instagram / Facebook posts.
          </small>
        </div>

        <div className="actions">
          <div className="logo-upload-wrap">
            <label className="upload">
              <Upload size={17} /> Upload logo
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const r = new FileReader();
                    r.onload = () => setLogo(String(r.result));
                    r.readAsDataURL(f);
                  }
                }}
              />
            </label>
            <small className="upload-hint">
              Recommended: <b>1000 × 1000 px PNG</b> • Transparent background
            </small>
          </div>
          <button className="primary" onClick={() => setTab("preview")}>
            <Eye size={17} /> View poster
          </button>
          <button
            className="primary export-desktop"
            disabled={exporting}
            onClick={() => exportPng(format)}
          >
            <Download size={17} /> {exporting ? "Exporting…" : "Download PNG"}
          </button>
        </div>
      </section>

      <section
        className={`preview-wrap ${tab === "edit" ? "mobile-hidden" : ""}`}
      >
        <div className="preview-head">
          <MapPinned size={17} /> Live preview{" "}
          <span>{totalArea.toLocaleString()} sq.ft</span>
        </div>
        <div ref={frameRef} className="poster-frame">
          <div
            ref={posterRef}
            id="poster"
            className={`poster format-${format}`}
            style={{ transform: `scale(${previewScale})` }}
          >
            <header className="hero">
              <div className="brand">
                <span className="brand-logo">
                  {logo ? <img src={logo} alt="logo" /> : <span>✦</span>}
                </span>
                <span>{p.brand}</span>
              </div>
              <div className="approval">
                {p.approval.split(" ").map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
              </div>
              <h2>{p.headline}</h2>
              <div className="benefits">
                <span>✓ நம்பகத்தன்மை</span>
                <span>✓ வெளிப்படைத்தன்மை</span>
                <span>✓ ஆவணச் சரிபார்ப்பு</span>
                <span>✓ உடனடி பதிவு</span>
              </div>
            </header>
            <div className="body">
              <div className="left-col">
                <div className="location-card">
                  <div className="card-title">📍 {p.location}</div>
                  <div className="location-text">
                    {p.landmark}
                    <br />
                    {p.distance}
                  </div>
                </div>
                <div className="details-card">
                  <div className="card-title">பிளாட் விவரம்</div>
                  <div className="detail">
                    <b>அகலம்</b>
                    <strong>{p.width} அடி</strong>
                  </div>
                  <div className="detail">
                    <b>நீளம்</b>
                    <strong>{p.length} அடி</strong>
                  </div>
                  <div className="detail">
                    <b>மொத்த பரப்பு</b>
                    <strong>{totalArea.toLocaleString()} சதுர அடி</strong>
                  </div>
                  <div className="detail">
                    <b>திசை</b>
                    <strong>{p.facing} (Facing)</strong>
                  </div>
                  <div className="detail">
                    <b>சாலை வசதி</b>
                    <strong>{p.roadCount} பக்கமும் சாலை</strong>
                  </div>
                </div>
              </div>
              <div className="map-card">
                <h3>உள்ளாட்சி சாலை</h3>
                <SiteMap p={p} />
              </div>
            </div>
            <div className="feature-row">
              <div>
                <span className="icon">🛣️</span>
                <b>
                  தார்சாலை
                  <br />
                  வசதி
                </b>
              </div>
              <div>
                <span className="icon">🏠</span>
                <b>
                  வசிப்பதற்கு
                  <br />
                  சிறந்த இடம்
                </b>
              </div>
              <div>
                <span className="icon">📜</span>
                <b>
                  உடனடி பதிவு
                  <br />
                  வசதி
                </b>
              </div>
              <div className="for-sale">
                விற்பனைக்கு
                <br />
                உள்ளது 👍
              </div>
            </div>
            <div className="footer-banner">{p.footer}</div>
            <footer>
              <div className="footer-brand">
                <span className="footer-logo">
                  {logo ? (
                    <img src={logo} alt="logo" />
                  ) : (
                    <div className="house-logo">⌂</div>
                  )}
                </span>
                <div>
                  <b>{p.brand}</b>
                  <small>நம்பகத்தன்மை எங்கள் அடையாளம்</small>
                </div>
              </div>
              <div className="phone">
                <div className="phone-number">
                  ☎ <strong>{p.phone}</strong>
                </div>
                <small>மேலும் விவரங்களுக்கு தொடர்பு கொள்ளவும்</small>
              </div>
            </footer>
          </div>
        </div>
      </section>

      <div className="mobile-export">
        <button className="secondary-big" onClick={() => setTab("edit")}>
          <Pencil size={18} /> Edit details
        </button>
        <button
          className="primary export-big"
          disabled={exporting}
          onClick={() => exportPng(format)}
        >
          <Download size={19} />
          {exporting
            ? "Exporting…"
            : `Download ${format === "story" ? "Status" : format === "feed" ? "Feed" : "Square"}`}
        </button>
      </div>
    </main>
  );
}
export default App;
