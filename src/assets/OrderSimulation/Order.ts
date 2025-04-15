// Simulate receiving new orders
// useEffect(() => {
//     const interval = setInterval(() => {
//         const partners = ['uber', 'doordash', 'grubhub'] as const;
//         const randomPartner = partners[Math.floor(Math.random() * partners.length)];
//         const fixedStoreId = 'store-001'; // Using fixed store ID for consistency
//         const randomMenu = `menu-00${Math.floor(1 + Math.random() * 3)}`;
//         const randomOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

//         const items = [
//             {
//                 name: ['Pizza', 'Burger', 'Sushi', 'Salad', 'Pasta'][Math.floor(Math.random() * 5)],
//                 quantity: Math.floor(1 + Math.random() * 3),
//                 price: parseFloat((7.99 + Math.random() * 10).toFixed(2))
//             },
//             {
//                 name: ['Fries', 'Wings', 'Breadsticks', 'Rice', 'Soup'][Math.floor(Math.random() * 5)],
//                 quantity: Math.floor(1 + Math.random() * 2),
//                 price: parseFloat((3.99 + Math.random() * 5).toFixed(2))
//             }
//         ];

//         // Calculate total
//         const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//         const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

//         const firstNames = ['John', 'Jane', 'Michael', 'Emma', 'David', 'Sarah', 'Robert', 'Linda'];
//         const lastNames = ['Smith', 'Johnson', 'Brown', 'Wilson', 'Lee', 'Walker', 'Hall', 'Young'];
//         const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
//         const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

//         const newOrder: Order = {
//             id: randomOrderId,
//             orderId: randomOrderId,
//             channelId: randomPartner,
//             storeId: fixedStoreId,
//             menuId: randomMenu,
//             orderStatus: 'pending',
//             totalAmount: parseFloat(totalAmount.toFixed(2)),
//             quantity: totalQuantity,
//             pickUpTime: new Date(Date.now() + Math.floor(15 + Math.random() * 60) * 60000).toISOString(),
//             customerDetails: {
//                 name: `${randomFirstName} ${randomLastName}`,
//                 phone: `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
//                 email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`
//             },
//             items: items,
//             timestamp: new Date().toISOString()
//         };

//         setOrders(prev => [newOrder, ...prev]);
//         showInfoToast(`New Order Received from ${newOrder.channelId.toUpperCase()}`);
//     }, 30000);

//     return () => clearInterval(interval);
// }, []);
