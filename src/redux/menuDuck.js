
let initial = {
    groups: {
        DINNER: {
            name: "DINNER",
            pic: "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/dinner.jpg"
        },
        BREAKFAST: {
            name: "BREAKFAST",
            pic: "https://i.cbc.ca/1.5192919.1561664247!/fileImage/httpImage/image.jpg_gen/derivatives/original_780/great-canadian-breakfast-sandwich.jpg"
        },
        DRINKS: {
            name: "DRINKS",
            pic: "https://www.sustagen.com.au/sites/site.prod1.sustagen.com.au/files/2019-03/chocolate-drink-mocha-delight.jpg"
        }
    },
    items: {
        "ñs334dkf": {
            name: "Café Americano",
            _id: "ñsdkf",
            price: 5,
            categories: ["BREAKFAST"],
            subCategory: "BREAKFAST",
            details: "Café colombiano con agua",
            pic: "https://www.cubaneandoconmario.com/wp-content/uploads/2017/01/Caf%C3%A9-americano.jpg"
        },
        "ofpmdf432": {
            name: "Hamburguesa Simple",
            _id: "ofpmdf432",
            price: 10,
            categories: ["DINNER"],
            subCategory: "Hamburguesas",
            details: "La mejor top sirloin de la zona",
            pic: "https://www.seekpng.com/png/detail/408-4084388_1-modelos-de-banner-de-hamburguers.png"
        },
        "8d8f8hf8": {
            name: "Onion Rings",
            _id: "8d8f8hf8",
            price: 0,
            categories: ["DINNER"],
            subCategory: "Acompañamientos",
            details: "Grasosos y deliciosos",
            pic: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/7f539fc41a5543aebfe03afed73a0b48/BFV9112_MozzarellaStickOnionRings.jpg"
        },
        "99d9jjgj": {
            _id: "99d9jjgj",
            name: "Agua",
            categories: ["DRINKS", "DINNER"],
            details: "Sin olor, sin sabor, simplemente perfecta",
            pic: "https://5.imimg.com/data5/GV/DP/MY-3831378/500ml-plastic-water-bottle-500x500.jpg",
            sizes: [
                {
                    size: "500ml",
                    price: 5
                },
                {
                    size: "750ml",
                    price: 8
                }
            ]
        },
    },
    orders: {},
    current: {}
}

export default function reducer(state = initial, action) {
    switch (action.type) {
        default:
            return { ...state }
    }
}