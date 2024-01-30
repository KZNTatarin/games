import './FiltresSection.css'

export default function FiltresSection() {
    return (
        <section className="filtres">
        <form action="">
          <select name="filtres__select" id="filtres__select">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
        </form>
        <div className="filtres__buttons">
          <button>Кнопка фильтра</button>
        </div>
      </section>
    )
}