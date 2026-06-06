import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend, LabelList
} from "recharts";

const KPI_ALL = { totalSales: 2252607.41, totalOrders: 9789, avgSales: 230.12, uniqueCustomers: 793 };

const KPI_BY_YEAR = {
  "2015": { totalSales: 479390, totalOrders: 2131, avgSales: 219.8, uniqueCustomers: 510 },
  "2016": { totalSales: 462530, totalOrders: 2296, avgSales: 208.4, uniqueCustomers: 519 },
  "2017": { totalSales: 604761, totalOrders: 2631, avgSales: 240.9, uniqueCustomers: 593 },
  "2018": { totalSales: 705926, totalOrders: 2731, avgSales: 252.7, uniqueCustomers: 638 },
};

const salesByMonthAll = [
  { month: "Jan", sales: 55943 }, { month: "Feb", sales: 39456 }, { month: "Mar", sales: 205398 },
  { month: "Apr", sales: 90789 }, { month: "May", sales: 94843 }, { month: "Jun", sales: 111452 },
  { month: "Jul", sales: 114218 }, { month: "Aug", sales: 113563 }, { month: "Sep", sales: 298819 },
  { month: "Oct", sales: 178956 }, { month: "Nov", sales: 287412 }, { month: "Dec", sales: 261759 },
];

const salesByMonthYear = {
  "2015": [
    { month: "Jan", sales: 9852 }, { month: "Feb", sales: 7213 }, { month: "Mar", sales: 48012 },
    { month: "Apr", sales: 19843 }, { month: "May", sales: 22130 }, { month: "Jun", sales: 26741 },
    { month: "Jul", sales: 28412 }, { month: "Aug", sales: 24563 }, { month: "Sep", sales: 68204 },
    { month: "Oct", sales: 42890 }, { month: "Nov", sales: 65780 }, { month: "Dec", sales: 61750 },
  ],
  "2016": [
    { month: "Jan", sales: 10241 }, { month: "Feb", sales: 8102 }, { month: "Mar", sales: 46920 },
    { month: "Apr", sales: 18920 }, { month: "May", sales: 22460 }, { month: "Jun", sales: 26100 },
    { month: "Jul", sales: 27180 }, { month: "Aug", sales: 23840 }, { month: "Sep", sales: 64800 },
    { month: "Oct", sales: 40600 }, { month: "Nov", sales: 62900 }, { month: "Dec", sales: 60467 },
  ],
  "2017": [
    { month: "Jan", sales: 14820 }, { month: "Feb", sales: 10940 }, { month: "Mar", sales: 55230 },
    { month: "Apr", sales: 25430 }, { month: "May", sales: 24830 }, { month: "Jun", sales: 29410 },
    { month: "Jul", sales: 30120 }, { month: "Aug", sales: 31460 }, { month: "Sep", sales: 80920 },
    { month: "Oct", sales: 48240 }, { month: "Nov", sales: 79180 }, { month: "Dec", sales: 74181 },
  ],
  "2018": [
    { month: "Jan", sales: 21030 }, { month: "Feb", sales: 13201 }, { month: "Mar", sales: 55236 },
    { month: "Apr", sales: 26596 }, { month: "May", sales: 25423 }, { month: "Jun", sales: 29201 },
    { month: "Jul", sales: 28506 }, { month: "Aug", sales: 33700 }, { month: "Sep", sales: 84895 },
    { month: "Oct", sales: 47226 }, { month: "Nov", sales: 79552 }, { month: "Dec", sales: 65360 },
  ],
};

const salesByYear = [
  { year: "2015", sales: 479390, growth: null },
  { year: "2016", sales: 462530, growth: -3.5 },
  { year: "2017", sales: 604761, growth: 30.8 },
  { year: "2018", sales: 705926, growth: 16.7 },
];

const salesByRegion = [
  { region: "West", sales: 710219.68 },
  { region: "East", sales: 660589.36 },
  { region: "Central", sales: 492646.91 },
  { region: "South", sales: 389151.46 },
];

const top10Products = [
  { name: "Canon imageCLASS 2200 Copier", sales: 61599.82 },
  { name: "Fellowes PB500 Binding Machine", sales: 27453.38 },
  { name: "Cisco TelePresence EX90", sales: 22638.48 },
  { name: "HON 5400 Series Task Chairs", sales: 21870.58 },
  { name: "GBC DocuBind TL300 Binding", sales: 19823.48 },
  { name: "Ibico EPK-21 Binding System", sales: 19024.50 },
  { name: "Hewlett Packard LaserJet 3310", sales: 18839.68 },
  { name: "HP Designjet T520", sales: 17999.95 },
  { name: "Lexmark MX611dhe Printer", sales: 16799.98 },
  { name: "Cisco SPA 501G IP Phone", sales: 15999.95 },
];

const salesByCategory = [
  { category: "Technology", sales: 825856.11 },
  { category: "Furniture", sales: 723538.48 },
  { category: "Office Supplies", sales: 703212.82 },
];

const salesBySubCategory = [
  { subCat: "Phones", sales: 326487.70 }, { subCat: "Chairs", sales: 322107.53 },
  { subCat: "Storage", sales: 217779.10 }, { subCat: "Tables", sales: 202810.63 },
  { subCat: "Binders", sales: 200028.79 }, { subCat: "Machines", sales: 189238.63 },
  { subCat: "Accessories", sales: 163881.69 }, { subCat: "Copiers", sales: 146248.09 },
  { subCat: "Bookcases", sales: 109408.30 }, { subCat: "Appliances", sales: 104075.46 },
];

const salesBySegment = [
  { segment: "Consumer", sales: 1146708, pct: 50.9 },
  { segment: "Corporate", sales: 682211, pct: 30.3 },
  { segment: "Home Office", sales: 423687, pct: 18.8 },
];

const shippingByMode = [
  { mode: "Same Day", avgDays: 0.04 },
  { mode: "First Class", avgDays: 2.18 },
  { mode: "Second Class", avgDays: 3.25 },
  { mode: "Standard Class", avgDays: 5.01 },
];

const formatCurrency = (v) => `$${Math.round(v).toLocaleString("en-US")}`;
const formatK = (v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`;
const formatM = (v) => v >= 1000000 ? `$${(v / 1000000).toFixed(2)}M` : formatK(v);

const REGION_COLORS = { West: "#2563eb", East: "#059669", Central: "#d97706", South: "#dc2626" };
const CATEGORY_COLORS = { Technology: "#4f46e5", Furniture: "#d97706", "Office Supplies": "#0d9488" };
const SEGMENT_COLORS = { Consumer: "#2563eb", Corporate: "#7c3aed", "Home Office": "#db2777" };
const SHIPPING_COLORS = { "Same Day": "#059669", "First Class": "#0d9488", "Second Class": "#ca8a04", "Standard Class": "#dc2626" };

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return value;
}

function KpiCard({ label, value, format, color, badge, icon }) {
  const animated = useCountUp(typeof value === "number" ? Math.round(value) : 0);
  const display = format === "currency"
    ? `$${animated.toLocaleString("en-US")}`
    : format === "decimal"
    ? `$${(animated / 100).toFixed(2)}`
    : animated.toLocaleString("en-US");

  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "20px 22px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderLeft: `4px solid ${color}`,
      display: "flex", flexDirection: "column", gap: 8, position: "relative"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" }}>{display}</div>
      {badge && (
        <div style={{
          fontSize: 11, fontWeight: 600, color: badge.positive ? "#059669" : "#dc2626",
          background: badge.positive ? "#d1fae5" : "#fee2e2",
          padding: "2px 8px", borderRadius: 20, alignSelf: "flex-start"
        }}>
          {badge.positive ? "▲" : "▼"} {badge.text}
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1f2937", borderRadius: 8, padding: "8px 14px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
      {label && <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 4px" }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: "#f9fafb", fontSize: 13, fontWeight: 600, margin: "2px 0" }}>
          {p.name}: {typeof p.value === "number" && p.value > 100 ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

const ProductTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div style={{ background: "#1f2937", borderRadius: 8, padding: "8px 14px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", maxWidth: 220 }}>
      <p style={{ color: "#f9fafb", fontSize: 12, margin: "0 0 4px", lineHeight: 1.4 }}>{item.payload.fullName}</p>
      <p style={{ color: "#fbbf24", fontSize: 14, fontWeight: 700, margin: 0 }}>{formatCurrency(item.value)}</p>
    </div>
  );
};

function Card({ title, children, style = {} }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", ...style }}>
      {title && <h3 style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 16px" }}>{title}</h3>}
      {children}
    </div>
  );
}

export default function SalesDashboard() {
  const [yearFilter, setYearFilter] = useState("All");
  const [activeRegions, setActiveRegions] = useState(["West", "East", "Central", "South"]);
  const [categoryView, setCategoryView] = useState("pie");
  const [darkMode, setDarkMode] = useState(false);

  const kpi = yearFilter === "All" ? KPI_ALL : KPI_BY_YEAR[yearFilter];
  const monthData = yearFilter === "All" ? salesByMonthAll : salesByMonthYear[yearFilter];
  const avgMonthly = Math.round(monthData.reduce((s, d) => s + d.sales, 0) / 12);
  const filteredRegions = salesByRegion.filter(r => activeRegions.includes(r.region));

  const productData = top10Products.map((p, i) => ({
    shortName: p.name.length > 28 ? p.name.slice(0, 28) + "…" : p.name,
    fullName: p.name,
    sales: p.sales,
    rank: i + 1,
  })).reverse();

  const bg = darkMode ? "#111827" : "#f1f5f9";
  const cardBg = darkMode ? "#1f2937" : "#fff";
  const textPrimary = darkMode ? "#f9fafb" : "#111827";
  const textSecondary = darkMode ? "#9ca3af" : "#6b7280";

  return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", color: textPrimary, transition: "background 0.3s" }}>
      {/* Header */}
      <div style={{ background: darkMode ? "#1e3a5f" : "#1e40af", padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
            📊 Superstore Sales
          </h1>
          <span style={{ fontSize: 11, color: "#bfdbfe" }}>Data through Dec 2018 · US Retail</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {/* Year filter */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.15)", borderRadius: 8, overflow: "hidden" }}>
            {["All", "2015", "2016", "2017", "2018"].map(y => (
              <button key={y} onClick={() => setYearFilter(y)} style={{
                padding: "5px 12px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                background: yearFilter === y ? "#fff" : "transparent",
                color: yearFilter === y ? "#1e40af" : "#e0f2fe", transition: "all 0.15s"
              }}>{y}</button>
            ))}
          </div>
          {/* Dark mode */}
          <button onClick={() => setDarkMode(!darkMode)} style={{
            background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
            padding: "6px 12px", color: "#fff", cursor: "pointer", fontSize: 14
          }}>{darkMode ? "☀️" : "🌙"}</button>
          {/* Export dummy */}
          <button title="Export coming soon" style={{
            background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
            padding: "6px 12px", color: "#e0f2fe", cursor: "pointer", fontSize: 12, fontWeight: 600
          }}>↓ Export</button>
        </div>
      </div>

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Region filter chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: textSecondary }}>Region:</span>
          {["West", "East", "Central", "South"].map(r => (
            <button key={r} onClick={() => setActiveRegions(prev =>
              prev.includes(r) ? (prev.length > 1 ? prev.filter(x => x !== r) : prev) : [...prev, r]
            )} style={{
              padding: "4px 14px", borderRadius: 20, border: `2px solid ${REGION_COLORS[r]}`,
              background: activeRegions.includes(r) ? REGION_COLORS[r] : "transparent",
              color: activeRegions.includes(r) ? "#fff" : REGION_COLORS[r],
              fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s"
            }}>{r}</button>
          ))}
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <KpiCard label="Total Sales" value={Math.round(kpi.totalSales)} format="currency" color="#2563eb" icon="💰"
            badge={{ positive: true, text: "+16.7% vs 2017" }} />
          <KpiCard label="Total Orders" value={kpi.totalOrders} format="number" color="#059669" icon="📦"
            badge={{ positive: true, text: "+1.5% vs 2017" }} />
          <KpiCard label="Avg Order Value" value={Math.round(kpi.avgSales * 100)} format="decimal" color="#7c3aed" icon="📊"
            badge={{ positive: true, text: "+4.9% vs 2017" }} />
          <KpiCard label="Unique Customers" value={kpi.uniqueCustomers} format="number" color="#d97706" icon="👥"
            badge={{ positive: true, text: "+7.6% vs 2017" }} />
        </div>

        {/* Monthly Line + Region Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
          <Card title="Sales by Month" style={{ background: cardBg }}>
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: textSecondary }} />
                <YAxis tickFormatter={formatK} tick={{ fontSize: 11, fill: textSecondary }} width={55} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={avgMonthly} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Avg", position: "right", fill: "#f59e0b", fontSize: 11 }} />
                <Line type="monotone" dataKey="sales" name="Sales" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3, fill: "#2563eb" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Sales by Region" style={{ background: cardBg }}>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={filteredRegions} layout="vertical" margin={{ left: 10, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} horizontal={false} />
                <XAxis type="number" tickFormatter={formatK} tick={{ fontSize: 11, fill: textSecondary }} />
                <YAxis type="category" dataKey="region" tick={{ fontSize: 12, fill: textPrimary }} width={55} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sales" name="Sales" radius={[0, 4, 4, 0]}>
                  {filteredRegions.map((entry) => (
                    <Cell key={entry.region} fill={REGION_COLORS[entry.region]} />
                  ))}
                  <LabelList dataKey="sales" position="right" formatter={formatK} style={{ fontSize: 11, fill: textSecondary }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Top 10 Products */}
        <Card title="Top 10 Products by Sales" style={{ background: cardBg }}>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={productData} layout="vertical" margin={{ left: 10, right: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} horizontal={false} />
              <XAxis type="number" tickFormatter={formatK} tick={{ fontSize: 11, fill: textSecondary }} />
              <YAxis type="category" dataKey="shortName" tick={{ fontSize: 11, fill: textPrimary }} width={190} />
              <Tooltip content={<ProductTooltip />} />
              <Bar dataKey="sales" name="Sales" radius={[0, 4, 4, 0]}>
                {productData.map((_, i) => {
                  const t = i / (productData.length - 1);
                  const r = Math.round(251 - t * (251 - 180));
                  const g = Math.round(191 - t * (191 - 120));
                  const b = Math.round(36 - t * (36 - 10));
                  return <Cell key={i} fill={`rgb(${r},${g},${b})`} />;
                })}
                <LabelList dataKey="sales" position="right" formatter={formatK} style={{ fontSize: 11, fill: textSecondary }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category + Segment + Shipping */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {/* Category */}
          <Card title="Category Split" style={{ background: cardBg }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              {["pie", "bar"].map(v => (
                <button key={v} onClick={() => setCategoryView(v)} style={{
                  padding: "4px 12px", borderRadius: 6, border: "1.5px solid #2563eb",
                  background: categoryView === v ? "#2563eb" : "transparent",
                  color: categoryView === v ? "#fff" : "#2563eb",
                  fontSize: 12, fontWeight: 600, cursor: "pointer"
                }}>{v === "pie" ? "Donut" : "Bar"}</button>
              ))}
            </div>
            {categoryView === "pie" ? (
              <div style={{ position: "relative" }}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={salesByCategory} dataKey="sales" nameKey="category" cx="50%" cy="50%" innerRadius={55} outerRadius={80}>
                      {salesByCategory.map((entry) => (
                        <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: textPrimary }}>$2.25M</div>
                  <div style={{ fontSize: 10, color: textSecondary }}>total</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {salesByCategory.map(c => (
                    <div key={c.category} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: CATEGORY_COLORS[c.category], flexShrink: 0 }}></span>
                      <span style={{ color: textPrimary, flex: 1 }}>{c.category}</span>
                      <span style={{ color: textSecondary, fontWeight: 600 }}>{((c.sales / 2252607.41) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={salesByCategory} margin={{ left: 0, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} vertical={false} />
                  <XAxis dataKey="category" tick={{ fontSize: 10, fill: textSecondary }} />
                  <YAxis tickFormatter={formatK} tick={{ fontSize: 10, fill: textSecondary }} width={50} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sales" name="Sales" radius={[4, 4, 0, 0]}>
                    {salesByCategory.map((entry) => (
                      <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>

          {/* Segment */}
          <Card title="By Segment" style={{ background: cardBg }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={salesBySegment} dataKey="sales" nameKey="segment" cx="50%" cy="50%" innerRadius={45} outerRadius={72}>
                  {salesBySegment.map((entry) => (
                    <Cell key={entry.segment} fill={SEGMENT_COLORS[entry.segment]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              {salesBySegment.map(s => (
                <div key={s.segment} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: SEGMENT_COLORS[s.segment], flexShrink: 0 }}></span>
                  <span style={{ color: textPrimary, flex: 1 }}>{s.segment}</span>
                  <span style={{ color: textSecondary, fontWeight: 600 }}>{s.pct}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Shipping */}
          <Card title="Shipping Performance" style={{ background: cardBg }}>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={shippingByMode} layout="vertical" margin={{ left: 5, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} horizontal={false} />
                <XAxis type="number" domain={[0, 6]} tick={{ fontSize: 10, fill: textSecondary }} tickFormatter={v => `${v}d`} />
                <YAxis type="category" dataKey="mode" tick={{ fontSize: 10, fill: textPrimary }} width={85} />
                <Tooltip formatter={(v) => `${v} days`} />
                <ReferenceLine x={3} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Target 3d", position: "insideTopRight", fill: "#f59e0b", fontSize: 10 }} />
                <Bar dataKey="avgDays" name="Avg Days" radius={[0, 4, 4, 0]}>
                  {shippingByMode.map((entry) => (
                    <Cell key={entry.mode} fill={SHIPPING_COLORS[entry.mode]} />
                  ))}
                  <LabelList dataKey="avgDays" position="right" formatter={v => `${v}d`} style={{ fontSize: 11, fill: textSecondary }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* YoY Combo */}
        <Card title="Year-over-Year Sales Trend" style={{ background: cardBg }}>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={salesByYear} margin={{ top: 20, right: 40, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: textSecondary }} />
              <YAxis yAxisId="left" tickFormatter={formatK} tick={{ fontSize: 11, fill: textSecondary }} width={60} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={v => v === null ? "" : `${v}%`} tick={{ fontSize: 11, fill: textSecondary }} domain={[-10, 40]} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div style={{ background: "#1f2937", borderRadius: 8, padding: "8px 14px" }}>
                    <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 4px" }}>{label}</p>
                    {payload.map((p, i) => (
                      <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600, margin: "2px 0" }}>
                        {p.name}: {p.name === "Growth %" ? (p.value === null ? "—" : `${p.value}%`) : formatCurrency(p.value)}
                      </p>
                    ))}
                  </div>
                );
              }} />
              <Bar yAxisId="left" dataKey="sales" name="Sales" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60}>
                <LabelList dataKey="sales" position="top" formatter={formatK} style={{ fontSize: 11, fill: textSecondary }} />
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="growth" name="Growth %" stroke="#f97316" strokeWidth={2.5} dot={{ r: 5, fill: "#f97316" }} activeDot={{ r: 7 }} connectNulls={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: 11, color: textSecondary, paddingBottom: 12 }}>
          Superstore US Retail Dataset · 9,789 transactions · 2015–2018
        </div>
      </div>
    </div>
  );
}
