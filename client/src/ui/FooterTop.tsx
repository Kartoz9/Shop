import Container from './Container';
import exchange from '../assets/exchange.png';
import guarantee from '../assets/guarantee.png';
import logistic from '../assets/logistic.png';

const FooterTop = () => {
    const incentives = [
        {
          name: "Free shipping",
          imageSrc: logistic,
          description:
            "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
        },
        {
          name: "10-year warranty",
          imageSrc: guarantee,
          description:
            "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
        },
        {
          name: "Exchanges",
          imageSrc: exchange,
          description:
            "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
        },
      ];
  return (
    <Container className="py-0">
        <div className="rounded-2xl bg-[#f6f6f6] px-6 py-16 sm:p-16">
            <div className="mx-auto max-w-xl lg:max-w-none">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">We built our business on customer service</h2>
                </div>
            </div>
            <div className="mx-auto mt-12 flex flex-wrap max-w-sm gap-8 sm:max-w-none lg:flex-nowrap">
                {incentives.map((item) => (
                    <div
                    key={item?.name}
                    className="text-center flex flex-col items-center sm:items-start lg:items-center flex-1"
                    >
                    <div className="sm:flex-shrink-0">
                        <div className="flex-root">
                        <img
                            src={item?.imageSrc}
                            alt="image"
                            className="h-16 w-16"
                        />
                        </div>
                    </div>
                    <div className="mt-3 text-center sm:text-left lg:text-center">
                        <h3 className="text-base font-medium text-gray-900">{item?.name}</h3>
                        <p className="mt-2 text-sm text-gray-500">{item?.description}</p>
                    </div>
                    </div>
                ))}
            </div>
        </div> 
    </Container>
  )
}

export default FooterTop