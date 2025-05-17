import { store } from "../lib/store"
import Container from "../ui/Container"
import { Link } from "react-router-dom"
import { FaTrashAlt } from "react-icons/fa"

const Compare = () => {
  const { compareProducts, removeFromCompare, clearCompare } = store()

  const allSpecs = compareProducts.reduce<string[]>((acc, product) => {
    if (product.specifications) {
      Object.keys(product.specifications as Record<string, unknown>).forEach(key => {
        if (!acc.includes(key)) acc.push(key)
      })
    }
    return acc
  }, [])

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product comparison</h1>
        {compareProducts.length > 0 && (
          <button
            onClick={clearCompare}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        )}
      </div>

      {compareProducts.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="mb-4">Вы еще не добавили товары для сравнения.</p>
          <Link
            to="/product"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Перейти к товарам
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-4 text-left">Specifications</th>
                {compareProducts.map(product => (
                  <th key={product._id} className="border p-4 text-left">
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-4 font-medium">Price</td>
                {compareProducts.map(product => (
                  <td key={`price-${product._id}`} className="border p-4">
                    {product.discountedPrice} ₴
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border p-4 font-medium">Category</td>
                {compareProducts.map(product => (
                  <td key={`category-${product._id}`} className="border p-4">
                    {product.category}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border p-4 font-medium">Brand</td>
                {compareProducts.map(product => (
                  <td key={`brand-${product._id}`} className="border p-4">
                    {product.brand}
                  </td>
                ))}
              </tr>
              {allSpecs.map(specKey => (
                <tr key={specKey}>
                  <td className="border p-4 font-medium">{specKey}</td>
                  {compareProducts.map(product => (
                    <td key={`${product._id}-${specKey}`} className="border p-4">
                      {String((product.specifications as Record<string, unknown>)?.[specKey] || '—')}
                    </td>
                  ))}
                </tr>
              ))}             
              <tr>
                <td className="border p-4 font-medium">Действия</td>
                {compareProducts.map(product => (
                  <td key={`delete-${product._id}`} className="border p-4">
                    <button
                      onClick={() => removeFromCompare(product._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Удалить"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Container>
  )
}

export default Compare