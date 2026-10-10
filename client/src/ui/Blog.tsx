import { useEffect, useState } from 'react'
import Container from './Container'
import Title from './Title'
import { BlogProps } from '../../type';

function Blog() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const endpoint = `${import.meta.env.VITE_API_URL}/blogs`;
          try {
            const response = await fetch(endpoint);
            const data = await response.json();
            setBlogs(data);
          } catch (error) {
            console.error("Помилка при отриманні категорій:", error);
          }
        };
        fetchData();
    }, []);
  return (
    <Container>
        <Title text="Наш блог" className="text-center"/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-7">
            {blogs.map((item:BlogProps)=>(
                <div key={item._id} className="group cursor-pointer">
                    <div className="overflow-hidden">
                        <img src={item.image} alt="blogImage" className="w-full h-60 object-cover group-hover:scale-110 duration-300"/>
                    </div>
                    <div className="mt-5">
                        <p className="text-sm uppercase font-medium text-gray-500">
                            {item?._base}
                        </p>
                        <p className="text-2xl font-bold line-clamp-1">{item?.title}</p>
                    </div>
                </div>
            ))}
        </div>
    </Container>
  )
}

export default Blog