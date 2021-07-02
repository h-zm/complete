// 第一种输出
// export var firstName = "h";
// export var lastName = "zm";

// 第二种
// let firstName = "h";
// let lastName = "zm";
// export { firstName, lastName };

// 第三种
// let firstName = "h";
// let lastName = "zm";
// module.exports = { lastName };
// module.exports = { firstName };

//第四种
// let firstName = "h";
// let lastName = "zm";
// export default {
//   firstName,
//   lastName
// };

// export default
let firstName = "h";
let lastName = "zm";

// 第五种
// export default firstName;

// 第六种
// export default {
//   firstName,
//   lastName
// };

// 第七种
export default function(doWhat, data) {
  console.log(doWhat, "信息");
}
// const doWhat = {
//   name: data => {
//     console.log(data, "名字信息");
//   }
// };
// 第八种
// export default function({ doWhat, doWhen }) {
//   // doWhat = function(list) {
//   //   console.log(list, "信息");
//   // };
//   // doWhen = function(data) {
//   //   console.log(data, "时间");
//   // };
//   doWhat = {
//     name: data => {
//       console.log(data, "名字2信息");
//     }
//   };
// }
