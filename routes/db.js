const data = [
  {
   "name": "The Power of HABIT",
    description: "The Power of HABIT: Why We Do What We Do in Life and Business. A young woman walks into a laboratory. Over the past two years, she has transformed almost every aspect of her life. She has quit smoking, run a marathon, and been promoted at work. The patterns inside her brain, neurologists discover, have fundamentally changed.",
    price: 360,
    author: "Charles Duhigg",
    image: "https://images-na.ssl-images-amazon.com/images/I/51ejXdSceNL._AA300_.jpg",
    incart: false,
    category: "business",
    type: "book",
    rating: 4,

  },
  {
   "name": "Think and Grow Rich",
    description: "'Think and Grow Rich!' explains entrepreneur Andrew Carnegie’s secret to success, revealed to Napoleon Hill during private interviews with Carnegie, the richest man of his time, and during more than 20 years of research into the lives and philosophies of more than 500 of the most successful people in America. This timeless classic presents a systematic nuts-and-bolts approach to developing the skills and mindset required to achieve exceptional success in any field or endeavor, personal or professional. Hill explains in detail 13 steps required to achieve those goals. The book contains numerous self-tests and checklists.",
    price: 280,
    author: "Napoleon Hill",
    image: "https://images-na.ssl-images-amazon.com/images/I/51ZouHoBGtL._SX315_BO1,204,203,200_.jpg",
    incart: true,
    category: "business",
    type: "book",
    rating: 3.6,

  },
  {
   "name": "The 7 Habits of Highly Effective People",
    description: "The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change. The 7 Habits of Highly Effective People, the beloved classic that has sold over 20 million copies worldwide, is celebrating its 25th anniversary with this reissue! With a new foreword, the wisdom of the 7 Habits still holds true after all these years. The 7 Habits have become so famous because they work. They have been integrated into everyday thinking by many millions of people. The reason: They work. Habit 1: Be Proactive. Habit 2: Begin with the End in Mind. Habit 3: Put First Things First. Habit 4: Think Win/Win. Habit 5: Seek First to Understand, Then to Be Understood. Habit 6: Synergize. Habit 7: Sharpen the Saw. The book presents a principle-centered approach for solving personal and professional problems.",
    price: 150,
    author: "Stephen R. Covey",
    image: "https://images-na.ssl-images-amazon.com/images/I/51Myx6jMujL._AA300_.jpg",
    incart: true,
    category: "business",
    type: "book",
    rating: 4.2,

  },
  {
   "name": "Principles: Life and Work",
    description: "In Principles, Dalio shares what he's learned over the course of his remarkable career. He argues that life, management, economics, and investing can all be systemized into rules and understood like machines.",
    price: 150,
    author: "Ray Dalio",
    image: "https://images-na.ssl-images-amazon.com/images/I/51UyMOpP%2BGL._AA300_.jpg",
    incart: false,
    category: "business",
    type: "book",
    rating: 2,

  },
  {
   "name": "How to Win Friends & Influence People",
    description: "For more than sixty years the rock-solid, time-tested advice in this book has carried thousands of now famous people up the ladder of success in their business and personal lives. Now this previously revised and updated bestseller is available in trade paperback for the first time to help you achieve your maximum potential throughout the next century!",
    price: 260,
    author: "Dale Carnegie",
    image: "https://images-na.ssl-images-amazon.com/images/I/51PWIy1rHUL._AA300_.jpg",
    incart: true,
    category: "business",
    type: "book",
    rating: 3,

  },
  {
   "name": "The Whole 30",
    description: "Since 2009, Melissa Hartwig’s critically-acclaimed Whole30 program has quietly led hundreds of thousands of people to effortless weight loss and better health—along with stunning improvements in sleep quality, energy levels, mood, and self-esteem. The program accomplishes all of this by specifically targeting people’s habits and emotional relationships with food. The Whole30 is designed to help break unhealthy patterns of behavior, stop stress-related comfort eating, and reduce cravings, particularly for sugar and carbohydrates. Many Whole30 participants have described achieving 'food freedom'—in just thirty days.",
    price: 130,
    author: "Melissa Hartwig",
    image: "https://images-na.ssl-images-amazon.com/images/I/61WFjEDBktL._SX437_BO1,204,203,200_.jpg",
    incart: true,
    category: "cookbooks",
    type: "book",
    rating: 5,

  },
  {
   "name": "The Food Lab",
    description: "Ever wondered how to pan-fry a steak with a charred crust and an interior that's perfectly medium-rare from edge to edge when you cut into it? How to make homemade mac 'n' cheese that is as satisfyingly gooey and velvety-smooth as the blue box stuff, but far tastier? How to roast a succulent, moist turkey (forget about brining!)―and use a foolproof method that works every time?",
    price: 160,
    author: "J. Kenji López-Alt",
    image: "https://images-na.ssl-images-amazon.com/images/I/419aGgQt-5L._SX392_BO1,204,203,200_.jpg",
    incart: true,
    category: "cookbooks",
    type: "book",
    rating: 3,

  },
  {
   "name": "True Fiction (Ian Ludlow Thrillers)",
    description: "A breakneck thriller where truth and fiction collide for the unluckiest writer alive.",
    price: 299,
    author: "Lee Goldberg",
    image: "https://images-na.ssl-images-amazon.com/images/I/51UbplnqSgL._SX331_BO1,204,203,200_.jpg",
    incart: false,
    category: "mystery",
    type: "book",
    rating: 4,

  },
  {
   "name": "The Last Move",
    description: "An FBI agent must catch a copycat killer. The only difference this time: she's the final victim.",
    price: 149,
    author: "Mary Burton",
    image: "https://images-na.ssl-images-amazon.com/images/I/514jRDA21TL._AA300_.jpg",
    incart: true,
    category: "mystery",
    type: "book",
    rating: 2,

  },
  {
   "name": "Stillhouse Lake (Stillhouse Lake Series)",
    description: "Gina Royal is the definition of average—a shy Midwestern housewife with a happy marriage and two adorable children. But when a car accident reveals her husband’s secret life as a serial killer, she must remake herself as Gwen Proctor—the ultimate warrior mom.",
    price: 165,
    author: "Rachel Caine",
    image: "https://images-na.ssl-images-amazon.com/images/I/41RTt7alEqL._SX332_BO1,204,203,200_.jpg",
    incart: true,
    category: "mystery",
    type: "book",
    rating: 1,

  },
  {
   "name": "Harry Potter and the Sorcerer's Stone",
    description: "On Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!",
    price: 265,
    author: "J.K.Rowling",
    image: "https://images-na.ssl-images-amazon.com/images/I/51qlgJ6ZojL.jpg",
    incart: true,
    category: "scifi",
    type: "book",
    rating: 3,

  },
  {
   "name": "A Game of Thrones: A Song of Ice and Fire, Book 1",
    description: "As a whole, this series comprises a genuine masterpiece of modern fantasy, bringing together the best the genre has to offer. Magic, mystery, intrigue, romance, and adventure fill these pages and transport us to a world unlike any we have ever experienced.",
    price: 250,
    author: "George R. R. Martin",
    image: "https://images-na.ssl-images-amazon.com/images/I/51n5SAiAz7L._AA300_.jpg",
    incart: false,
    category: "accessories",
    type: "book",
    rating: 2,

  },
  {
   "name": "The Lord of the Rings: One Volume",
    description: "In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others.",
    price: 220,
    author: "J.R.R. Tolkien",
    image: "https://images-na.ssl-images-amazon.com/images/I/51d4G0sFMzL.jpg",
    incart: true,
    category: "scifi",
    type: "book",
    rating: 4,

  },
  {
   "name": 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 399,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: 3.9,
  },
  {
   "name": 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 799,
    description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: 4.1,
    type: "cloths"

  },
  {
   "name": 'Mens Cotton Jacket',
    price: 699,
    description: 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: 4.7,
    type: "cloths"
  },
  {
   "name": 'Mens Casual Slim Fit',
    price: 499,
    description: 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
    category: "men",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: 2.1,
    type: "cloths"
  },
  {
   "name": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 40695,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: 4.6,
    type: "jewelry"
  },
  {
   "name": 'Solid Gold Petite Micropave ',
    price: 1299,
    description: 'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    rating: 3.9,
    type: "jewelry"
  },
  {
   "name": 'White Gold Plated Princess',
    price: 999,
    description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    rating: 3,
    type: "jewelry"
  },
  {
   "name": 'Pierced Owl Rose Gold Plated Stainless Steel Double',
    price: 1099,
    description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
    rating: 1.9,
    type: "jewelry"
  },
  {
   "name": 'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',
    price: 1640,
    description: 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: 3.3,
    type: "electronics"
  },
  {
   "name": 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    price: 459,
    description: 'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    rating: 2.9,
    type: "electronics"
  },
  {
   "name": 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
    price: 1199,
    description: '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
    rating: 4.8,
    type: "electronics"
  },
  {
   "name": 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
    price: 2149,
    description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
    rating: 4.8,
    type: "electronics"
  },
  {
   "name": 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
    price: 8599,
    description: '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
    rating: 2.9,
    type: "electronics"
  },
  {
   "name": 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ',
    price: 9999,
    description: '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
    rating: 2.2,
    type: "electronics"
  },
  {
   "name": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 569,
    description: 'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',
    category: "women",
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    rating: 2.6,
    type: "cloths"
  },
  {
   "name": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 1499,
    description: '100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON',
    category: "women",
    image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
    rating: 2.9,
    type: "cloths"
  },
  {
   "name": 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
    price: 1099,
    description: "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: "women",
    image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
    rating: 3.8,
    type: "cloths"
  },
  {
   "name": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 989,
    description: '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
    category: "women",
    image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
    rating: 4.7,
    type: "cloths"
  },
  {

   "name": "Opna Women's Short Sleeve Moisture",
    price: 795,
    description: '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
    category: "women",
    image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
    rating: 4.5,
    type: "cloths"
  },
  {

   "name": 'DANVOUY Womens T Shirt Casual Cotton Short',
    price: 699,
    description: '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
    category: "women",
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
    rating: 3.6,
    type: "cloths"
  }]