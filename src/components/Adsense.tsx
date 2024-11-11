import Script from "next/script";

type AdsenseTypes = {
    pId: string;
}

const Adsense: React.FC<AdsenseTypes> = ({ pId }) => {
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    )
}

export default Adsense;