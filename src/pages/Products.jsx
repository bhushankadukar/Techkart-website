import { useMemo, useState } from "react";
import LaptopCard from "../components/LaptopCard.jsx";
import { laptops } from "../data/laptops.js";

export default function Products() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState("150000");
  const [sort, setSort] = useState("featured");

  const brands = ["All", ...new Set(laptops.map((laptop) => laptop.brand))];

  const visibleLaptops = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = laptops.filter((laptop) => {
      const matchesSearch = `${laptop.name} ${laptop.brand} ${laptop.processor}`.toLowerCase().includes(query);
      const matchesBrand = brand === "All" || laptop.brand === brand;
      const matchesPrice = laptop.price <= Number(maxPrice);
      return matchesSearch && matchesBrand && matchesPrice;
    });

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, brand, maxPrice, sort]);

  function resetFilters() {
    setSearch("");
    setBrand("All");
    setMaxPrice("150000");
    setSort("featured");
  }

  return (
    <section className="catalog-page">
      <div className="catalog-hero">
        <div><span className="section-kicker">THE TECHKART COLLECTION</span><h1>Find your next laptop<span>.</span></h1><p>Thoughtful picks for students, creators, professionals, and gamers.</p></div>
        <div className="catalog-count"><strong>{visibleLaptops.length.toString().padStart(2, "0")}</strong><span>laptops to explore</span></div>
      </div>

      <div className="catalog-layout">
        <aside className="filter-panel">
          <div className="filter-title"><h2>Filters</h2><button type="button" onClick={resetFilters}>Reset</button></div>
          <label htmlFor="search">Search laptops</label>
          <input id="search" className="control" type="search" placeholder="Name, brand, processor..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <label htmlFor="brand">Brand</label>
          <select id="brand" className="control" value={brand} onChange={(e) => setBrand(e.target.value)}>
            {brands.map((item) => <option key={item} value={item}>{item === "All" ? "All brands" : item}</option>)}
          </select>
          <div className="filter-label-row"><label htmlFor="maxPrice">Maximum price</label><strong>₹{Number(maxPrice).toLocaleString("en-IN")}</strong></div>
          <input id="maxPrice" className="range-control" type="range" min="40000" max="150000" step="5000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          <div className="range-labels"><span>₹40,000</span><span>₹1,50,000</span></div>
          <div className="filter-note"><span>ⓘ</span> These are sample products and illustrative prices.</div>
        </aside>

        <div className="catalog-results">
          <div className="catalog-toolbar">
            <p><strong>{visibleLaptops.length}</strong> results found</p>
            <div className="sort-control"><label htmlFor="sort">Sort by</label><select id="sort" className="control" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select></div>
          </div>
          {visibleLaptops.length ? <div className="product-grid catalog-grid">{visibleLaptops.map((laptop) => <LaptopCard key={laptop.id} laptop={laptop} />)}</div> :
            <div className="empty-catalog"><span>⌕</span><h2>No laptops found</h2><p>Try a different search or loosen your filters.</p><button className="button button-primary" onClick={resetFilters}>Clear filters</button></div>}
        </div>
      </div>
    </section>
  );
}