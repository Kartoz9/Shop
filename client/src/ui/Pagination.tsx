import { useEffect, useState } from "react";
import { ProductProps } from "../../type";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";

interface ItemsProps {
    currentItems: ProductProps[];
}

const Items = ({ currentItems }: ItemsProps) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {currentItems &&
          currentItems?.map((item: ProductProps) => (
            <ProductCard key={item?._id} item={item} />
          ))}
      </div>
    );
  };

function Pagination() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const endpoint = `${import.meta.env.VITE_API_URL}/products`;
          try {
            const response = await fetch(endpoint);
            const data = await response.json();
            setProducts(data);
          } catch (error) {
            console.error("Помилка при отриманні категорій:", error);
          }
        };
        fetchData();
    }, []);
    const itemsPerPage = 15;
    const [itemOffset, setItemOffset] = useState(0);
    const [itemStart, setItemStart] = useState(1);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        const newStart = newOffset + 1;
        setItemOffset(newOffset);
        setItemStart(newStart);
  };

  return (
    <>
        <Items currentItems={currentItems}></Items>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
            <ReactPaginate
                nextLabel=""
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel=""
                pageLinkClassName="w-9 h-9 border[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                pageClassName="mr-6"
                containerClassName="flex text-base font-semibold py-10"
                activeClassName="bg-black text-white"
            />
            <p>
                Товари від {itemStart} до {Math.min(endOffset, products?.length)}{" "} з {products?.length}
            </p>
        </div>
    </>
  )
}

export default Pagination