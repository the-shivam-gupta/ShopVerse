import React, { useState } from "react";
import { Heart, Eye, Plus, Star, Shuffle } from "lucide-react";
import { useTranslation } from "react-i18next";
import CompareModal from "./CompareModal";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

const products = [
  // SHIRTS
  {
    name: "card.Tshirt",
    category: "card.oversizeShirt",
    price: 41.0,
    rating: 4,
    originalPrice: 48.0,
    badge: "15% off",
    mainImage:
      "https://unstd.in/cdn/shop/files/SAGE-GREEN-2.jpg?v=1734507963&width=1200",
    hoverImage:
      "https://unstd.in/cdn/shop/files/BLACK_7df11807-93c3-49d9-8347-614a9160f3d7.jpg?v=1729851686&width=1200",
  },
  {
    name: "card.poloShirt",
    category: "card.shirt",
    price: 45.0,
    rating: 3,
    originalPrice: 56.0,
    badge: "SALE",
    mainImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7S4S_cU6eeigDnRXLCtaN-awIcyF9uyexJsasi6obJz16Tl5U7UWclUqGiokAISA6Qw&usqp=CAU",
    hoverImage:
      "https://assets.ajio.com/medias/sys_master/root/20240215/x4q0/65ce361205ac7d77bb5c302c/-473Wx593H-410478807-1515-MODEL.jpg",
  },
  {
    name: "card.mencasualShirt",
    category: "card.casualShirt",
    price: 38.0,
    rating: 4,
    originalPrice: 45.0,
    badge: "NEW",
    mainImage:
      "https://image.hm.com/assets/hm/01/1a/011a2cad5a22200d6085a7fccef76bf1cad8ac8a.jpg?imwidth=1260",
    hoverImage:
      "https://image.hm.com/assets/hm/3b/32/3b324e8953a17cf0d84b98cedfec69c9fb4ae304.jpg?imwidth=1260",
  },
  {
    name: "card.menformalShirt",
    category: "card.formalShirt",
    price: 49.0,
    rating: 5,
    originalPrice: 60.0,
    mainImage:
      "https://static.zara.net/assets/public/9db4/21c7/c5754c31b06e/85def9cf663b/07545309538-e1/07545309538-e1.jpg?ts=1740133970201&w=750",
    hoverImage:
      "https://static.zara.net/assets/public/fdb5/2ec7/ed0144759f94/32665b36d948/01063309403-e1/01063309403-e1.jpg?ts=1736779492300&w=750",
  },
  {
    name: "card.mendenimShirt",
    category: "card.denimShirt",
    price: 52.0,
    rating: 4,
    originalPrice: 65.0,
    badge: "HOT",
    mainImage:
      "https://static.zara.net/assets/public/f97d/21f4/3c6b43b6a39a/dad35c87289b/04470424407-e1/04470424407-e1.jpg?ts=1736354285257&w=750",
    hoverImage:
      "https://static.zara.net/assets/public/9f2e/dec1/fede471c84f1/6956996e6c24/04470424407-e2/04470424407-e2.jpg?ts=1736354285347&w=750",
  },
  {
    name: "card.menprintedShirt",
    category: "card.printedShirt",
    price: 45.0,
    rating: 4,
    originalPrice: 55.0,
    mainImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTGS8tlwB340uIOXf6IAqy0Tc__ygaoLIbshgF1FUthX4xNl52oIypzHTlPupujQP86vVh7nwXIEtXpBfOMCKcUThyJ6nDMqEUTOunhhWFIavVfd7mfGeOwYSex",
    hoverImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT9-QW4KLad9wJYGuEemJ0fx5viELPlJ-E4smjRgFNgo6ZIUMQDeY4qBygLjlQWDLtZFilByRM3zTyBVwUo35OKWR_X8RxmCFrOrNNk27v3xGIviq96aU7uZXc",
  },

  // ELECRONICS
  {
    name: "card.femaleWatch",
    category: "card.watch",
    price: 59.0,
    rating: 5,
    originalPrice: 67.0,
    mainImage: "https://m.media-amazon.com/images/I/81AmHv7jKsL._SX679_.jpg",
    hoverImage: "https://m.media-amazon.com/images/I/71F07y-AdAL._SX679_.jpg",
  },

  {
    name: "card.sonyHeadphone",
    category: "card.headphone",
    price: 40.0,
    rating: 4,
    originalPrice: 55.0,
    mainImage: "https://m.media-amazon.com/images/I/51UBVW9enzL._SL1200_.jpg",
    hoverImage: "https://m.media-amazon.com/images/I/41jR+301vvL._SL1200_.jpg",
  },
  {
    name: "card.phone",
    category: "card.smartphone",
    price: 999.0,
    rating: 5,
    originalPrice: 1099.0,
    badge: "NEW",
    mainImage:
      "https://www.designinfo.in/wp-content/uploads/2023/10/samsung-s23-ultra-5g-1-11-485x485-optimized.webp",
    hoverImage: "https://arnavtelecom.com/wp-content/uploads/2023/02/samg7.png",
  },
  {
    name: "card.tab",
    category: "card.tablet",
    price: 149.99,
    rating: 4,
    originalPrice: 179.99,
    mainImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQZKY_HpNVkwM3aF0xO3KKnlGvQkqohHkC-twP5YJM9xOyfhEK_BnwxNUxvWuKuYp0KLO68vKyW1j5mJ4ZNY_KrzGZaWyMH1VpL6X0rZo6w",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRJ9vmhkS9BaNLA5xjjFKFemUng47Cc_rv7wgNsgVnc_gRRGDh1fqkL5KEpMGAlfNtVCzwJS_FZiP5Tns3Tf0JpEpzcnwHL8Ew65WxlQIc",
  },
  {
    name: "card.DellLaptop",
    category: "card.laptop",
    price: 799.99,
    rating: 5,
    originalPrice: 899.99,
    badge: "SALE",
    mainImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQSIg1dKlyn52G4HstIWTcJXarjt2RPEYidixHpr1UewuGDro2EgXXQKJjzUyT_6nNYF_V9noI-VWrnGjsjkIKSW_Hd_iVIYnzCJUlWFpXXc8GQuD1QFIHqYw",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRyC6EuE-RIhKV0lvZN18H91nfjHvRmfx-ND7cxOIuPV9uPwJlwlG-FWEKvH7pw4ZA5Ln_n8hepehtRS-4FYhuX9xTZ7AxWGqnr5zJfq6pWfIGtz3gxVu0V3w",
  },
  {
    name: "card.smartwatch",
    category: "card.watch",
    price: 129.0,
    rating: 4,
    originalPrice: 149.0,
    mainImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQItb996RoCSf7Jm2cGa0c7eIrHIEddKUB_D0vzREQca8UCsn_GNatDeVy9Lp5nmSQ5sg1vJAkmVIG02pGLc2GGOaspHPo2PBO7A1CxPg1KHtBqHVOhx69d",
    hoverImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS8BMUXfK3BsvwgvRZKLf2k4n55PS-rwNfxPFuM_E1HHxOnQaDAYE1YSsjyFIj38wLa6IodcIXcJNE1iEMUFE9jRVoNbX-6nqvm_tozjGXDBOsuBiwe23ay",
  },
  {
    name: "card.wiredPowerBank",
    category: "card.powerBank",
    price: 79.99,
    rating: 4,
    originalPrice: 89.99,
    mainImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRRjLssnkjyYRgeYmzQNWj12x7uM9ZEING-h3ZwBTPQ6YWvR2OoQ50tGJspJjc2ebPLXhB0VkrTz8VEIpLZJsJItYR74DfeeSub1_e-PmbF5XPP8ExNL4MyDA",
    hoverImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSHmw6NVFOT7dB9Lz8AXlFo_95t-JMX252wfkYCZUMXJpvMMsAni6U3m5IDgPxCutNY-rjyQEssiyU0UVeR4OoOqXsa1uvWeJg5-CDLcbZSeOYVngzY-3uN",
  },

  // BOTTOM
  {
    name: "card.midiSkirt",
    category: "card.skirt",
    price: 25.0,
    rating: 5,
    originalPrice: 35.0,
    badge: "NEW",
    mainImage:
      "https://static.zara.net/assets/public/e667/4234/b16a4d7e96f6/ca4ead1f2a2d/04758010800-e1/04758010800-e1.jpg?ts=1740589030990&w=1126",
    hoverImage:
      "https://static.zara.net/assets/public/1bcd/bbbf/05904442b484/ddecba6c34c8/04758010800-e2/04758010800-e2.jpg?ts=1740589031074&w=750",
  },
  {
    name: "card.menjeans",
    category: "card.jeans",
    price: 69.9,
    rating: 4,
    originalPrice: 79.9,
    badge: "TRENDING",
    mainImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSQtRUeUFuO6LyGGUyDyhmkWpoFfI1eNFCybrYdD_KhHFk7oMiBSRnjTxX0RvZnpnpv_jISSVPeicbgu9B6zuyny9-NTNLlWBfZBq_XgLG3A6_XeF0GxxVaEuk",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRU02agbGYk-r9l-jZDJ_l2qorTKDgLgg68QIgqrwh2G2RfI9GXvJvBgj7Oa6DhBAx6VYXUv_ExQQfnT5Pk7tEYGKAbmaIIeTVdfeucbQLnNFTqhgsF1POiwSc",
  },
  {
    name: "card.mentrousers",
    category: "card.trousers",
    price: 43.9,
    rating: 4,
    originalPrice: 59.9,
    mainImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRC72bTHM6-PKg5NBqU-hmDv_gnS1tJgYLtOrFleGG6xM15yO0jobi_C8ruyHyM2EiBLkPuEckPwI74ZOfcvc7JfUy64lp0-kk1yjRVe5sBGLhfMMEyoASRyA",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS5mBgAf9CgdAzST37_n62lChSL2kng6tJ8jmiLCQcYWtU9pCU8sbGxAlvmgKefRSMmnjUuCc0WCiTKS4LlF9YcLPKB8DWyGMK7_K-LErs97sSGAd3NmipRKdg",
  },
  {
    name: "card.menshorts",
    category: "card.shorts",
    price: 49.9,
    rating: 4,
    originalPrice: 59.9,
    mainImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTsI4gWJAM2GsHwi8gMA3bM69q-FD9_lBu8jlCkZh2O1rFPjiwySm57uMixHETsliZdRHjZm2TNkTfO6fIOz_dCOh5zTwLEVbgw61MAEn5WwOjHEMp_GhOFjac",
    hoverImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTf2-RxtfTgm3KryidtW6Sr275ZxRFYzqqnSfnQWXiWcEKpmWOBLAGZYApqX6yG1EA4qUil9h9s620e8SjbAxUJKat2UYSl-TwmAej5wfHUpPlZaETxZkGFJak",
  },

  // ACCESSORIES
  {
    name: "card.menBracelet",
    category: "card.bracelet",
    price: 35.0,
    rating: 5,
    originalPrice: 42.0,
    badge: "PERMIUM",
    mainImage:
      "https://in.danielwellington.com/cdn/shop/files/qs55z9vln2zkthusyjp3.png?v=1717669152",
    hoverImage:
      "https://in.danielwellington.com/cdn/shop/files/t2kdcsyps4da4bd99nps.png?v=1717669157",
  },
  {
    name: "card.womenNecklace",
    category: "card.necklace",
    price: 89.0,
    rating: 4,
    originalPrice: 99.0,
    badge: "TRENDING",
    mainImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSSzjF4ta_LiQuFXqDqUKNTpHroVqadmDayHTfR-qAeOGQtCeFvglvoEZzqXJ0UqCIfcfxNLKkRENZYO-jG43YdgmIKgFDQfHHLzzNibiE9",
    hoverImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcThSnYB30M1hC98ROfDHRuiFyfzFnosfDT_Xrg1SMYHf6CO9lDozk1U7KPuhFogPLNzrDCc2A1yzpgqNVqLoQi-TMvEDmJi-X_tPjea6-NILH3WCD4n4W95",
  },
  {
    name: "card.womenRings",
    category: "card.rings",
    price: 49.0,
    rating: 5,
    originalPrice: 59.0,
    mainImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSpGfEcUdJgNHd0ibraRpBJ2DCo2l5jZQnWdhD0qd5nuBOQ--Lqky-_H1eReMUn45caIWEIXEe2-joBHoImdGD1iG2OsnYV34AWIA14SJNvCxgU_-dF_h3z",
    hoverImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR5rUHMDSdk-ST7_tUNhW5IKFla-T3WhqyLeJjBu9zLwzWxQUH6q63LxLEUBXh7nzX7y1Cx4KVwbYk7lpnErqlX0itpW7tqFATugnw0GMuDE7RI5gLA-Ueo",
  },
  {
    name: "card.menSunglasses",
    category: "card.sunglasses",
    price: 120.0,
    rating: 4,
    originalPrice: 129.0,
    badge: "NEW",
    mainImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTd-w4pz_225iiFm8R26gdb4RaBRa7mQ4rv4jykeRjgwXqiz4ZiBzHBtasoDT4aCsRhP4s9dFGWNvh_jtm2BslvCSRbxa1ZKvhZ9lpwldiZ9f7QWjypkkIl6g",
    hoverImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQswm-OPHyr71uHAjy0WFnoRlItfcfiB97NaSr0IwVzSa9nXVYinbh9-Wwd1kxCaX5Zm7x4TpVY8wKrvZbzz5Ze6_FJAzFnQdTlIUcx5ABwb_mDHiTLwQRst3U",
  },
  {
    name: "card.menWallet",
    category: "card.wallet",
    price: 20.69,
    rating: 4,
    originalPrice: 25.0,
    mainImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSNojsfVLb9ELnGXkgh6TQHPBcrHlA_TfLTZrfhO07OttfFDOJOv9ctRi7WmWHiorFdhDTSzvyJ7eM_lAA4DohToFvOnm1RT9HOwnpNGoSIkUEC4zadrl0yvZOY",
    hoverImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ7bg5vt58p55I4xnaYvEgXfqmkfZlCI-sZIE9sdnRWeoiy1Qh30BswFihRxI0xsS9_1CHK6J1hUM-tBeG8HMyt1ESpRjEEkPKEmEnYlO8IJGSoaFDqGKvGhY0",
  },

  // OUTWEAR
  {
    name: "card.menJacket",
    category: "card.jacket",
    price: 58.0,
    rating: 4,
    originalPrice: 65.0,
    mainImage:
      "https://static.zara.net/assets/public/f63e/cc27/af5849489e53/130a2d871651/03833399064-e1/03833399064-e1.jpg?ts=1734948309189&w=750",
    hoverImage:
      "https://static.zara.net/assets/public/9759/2066/3aad42ec99d2/6ccd24893888/03833399064-e2/03833399064-e2.jpg?ts=1734946680820&w=750",
  },
  {
    name: "card.menBlazer",
    category: "card.blazer",
    price: 75.0,
    rating: 5,
    originalPrice: 90.0,
    badge: "NEW",
    mainImage: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTGNx7JPc94y5ugGyxZIW8bNgofBohMvdgWf-5q21tHQNdrwspKM8JaIU7kNFCGg_-JcYrtyqZDh2SFBs8W_50JriHq3DN7EH7Y_D9imZtNPZnqYERvbzPa",
    hoverImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQYUhTtz3nnn2j1EErElxqWkWUoHpyF8Mff0uGTXiQzP3NFGDt3XdfEhRkORJ9CJsQvOy_-tZ4pNdSY0PYwZsVXqrLGIDa0AC1Gipn0Q8M1fMxqSysEzMuX",
  },
  {
    name: "card.longCoat",
    category: "card.coat",
    price: 92.0,
    rating: 5,
    originalPrice: 110.0,
    badge: "WINTER",
    mainImage: "https://m.media-amazon.com/images/I/41+PfFffWsL._AC_SX522_.jpg",
    hoverImage:
      "https://m.media-amazon.com/images/I/41QOYsRIyzL._AC_SX522_.jpg",
  },
  {
    name: "card.blackHoodie",
    category: "card.hoodie",
    price: 34.0,
    rating: 4,
    originalPrice: 40.0,
    mainImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSONW9eZabq9lpmRW-o4MtvaciwAgundX8GzkYcMZBm4eOHp2RN1VvVLIzmUgdyHDW51iIf329jHJtdd27uug6pMMoeW_6mwRnpWT7ktFTb5XAOKv8Ne7PqKSlF",
    hoverImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR_iQ7GX04_98ea162jYDqk2N0H-CIb8-U3GsbUiqD95jbVULm9-F5P3mxELASgWQKQODlGQbJR0uAburgd7usB0tTS7Sbh9iDr_eeSCNdaU6NgyLOj2XQjfPEH",
  },
  {
    name: "card.greyCardigan",
    category: "card.cardigan",
    price: 48.0,
    rating: 4,
    originalPrice: 56.0,
    mainImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSjjO-s-ZIZLt4IqNNukivffmEp8WnmOZ4GlgNBPuf2pUzz8BmSaJfyAhDbMxpZM1av4BpXIVvci3EIfOThkiuJrxtmfoLrev0-BXMzuaBSmK1tApaZHUqld74",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQNytXhBmaafTarKLth62XdVNQQwUupL11Y0pFdkbYyJyvFsVwLtKD-A09Vn0DI7pitise-gSX-mHu5i7rUivdmjTfkPA23zdtrY8_RDfSYlbPNEp7AF5-pJQ",
  },
  {
    name: "card.denimVest",
    category: "card.vest",
    price: 29.0,
    rating: 3,
    originalPrice: 34.0,
    mainImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSo2hVKD0-DnIQPBVdzuJjkdkBjZp8pLm49qznRwjc2XVIfkuz1U5cSuA5tH__DfOfdV_-S9YfT0jSDotJdT8bYpJXu_y-Nz-iPXqdP8SRyS5RZyFZ7ALujPwU",
    hoverImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRQ7GI4tbLmHXV9H_IuSGncDTo3iOnzzXn79iuxb1qK6H9c5iaqEwplY3qwNhq63DsXaw1yOf-A9VnPMWY1FKIH4LZ4Dz6xVmYEHouMrqKx",
  },

  // SHOES
  {
    name: "card.menShoes",
    category: "card.shoes",
    price: 50.0,
    rating: 4,
    originalPrice: 56.0,
    mainImage: "https://m.media-amazon.com/images/I/61kliJGTrML._SY625_.jpg",
    hoverImage: "https://m.media-amazon.com/images/I/71XCHR8wBiL._SY625_.jpg",
  },
  {
    name: "card.whiteSneakers",
    category: "card.sneakers",
    price: 55.0,
    rating: 4,
    originalPrice: 65.0,
    badge: "TRENDING",
    mainImage:
      "https://www.bbassets.com/media/uploads/p/l/40341087_1-puma-by-cliq-mens-smash-pop-white-casual-sneakers.jpg",
    hoverImage:
      "https://www.bbassets.com/media/uploads/p/l/40341087-3_1-puma-by-cliq-mens-smash-pop-white-casual-sneakers.jpg",
  },
  {
    name: "card.leatherSandals",
    category: "card.sandals",
    price: 30.0,
    rating: 3,
    originalPrice: 38.0,
    mainImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQQI5UD39xZBn0TTR4l_pCX-tvG-iCpwC4AfJe2oHGXsQT9XGpsZD-5JCBFese1XxURHEZ0UTAOfrm2b1_lImowdjTXX8k-DL0tprD-dV8Mw7GsEzikgrcwmCk",
    hoverImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQNx376bgFacKz9de7uAKU8EE8dPzhCbqnT_gLzj5V3UJvCww0SHiNQzwBp8dqqxfxpqivLcO2mREpRwvJhACleC7JykK9jC17tRTZ527HaIp7V9HkfNKYobw",
  },
  {
    name: "card.ankleBoots",
    category: "card.boots",
    price: 68.0,
    rating: 5,
    originalPrice: 79.0,
    mainImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRTZSeRtfRPxrJK7gtl2HRflkQgIAO9IhnCR0kd-AzZTu-1p037M1jP-BqaOfARMY22Uu8p84V5pWGklT_QK6Tsh2xmUSKo1bJ6NtTCv8rk1RhDzpx86rhbgCNZ",
    hoverImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ6dmgTIoW5oPLJZo32ZqfWq-Tjgz2XfWARat0YsTVUbexvTvPHfiETYT3K-oSj5KiHNQdVoik3XGfe50CsVBnz5KXBst5ftRmWb9kdtjUJ0szAmHNEGL0ODh4",
  },
  {
    name: "card.beachFlipFlops",
    category: "card.flipFlops",
    price: 12.0,
    rating: 4,
    originalPrice: 16.0,
    mainImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSTVou2drjuwOQWYnbzYe_RxrhvBQIIeHQ3vhxDm6BYN2ZYdak7v6XYpVWlO5EKCZmbks1slLP-61R0Cb3woAhw5fkRw0WLA6L6ZmkXdKEH7hFTL53qVgA5dw",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS569j5HD2yMPCmwBQft7CGQbHVzvyuoUQGENyD2jEjtNBAOlVNuftu8DDgmODNYUj0qixRqMZXpI0zGAtU0eBrxq9ov_p9kU6Aa4_YM6j3oJ_DDZqto2X-Vx0",
  },
  {
    name: "card.casualLoafers",
    category: "card.loafers",
    price: 44.0,
    rating: 4,
    originalPrice: 52.0,
    mainImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQXEJVPVxcH2eebOm7d3T6219ALgXi2pWHOZUnD-zBa4QfnNe7_46de_P2bPUhFTR_exbcO1AKy6KOedR_tUayIHtgk30CTryUY23uGuurgVuRXIOanxqF_zQ",
    hoverImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSx5CgN2P-OT4SzfnbU65GaH6C-OdQBa0W36E8QZe2Vm1LEg5xQl6X9Cceq-yKEIg1rxdiCWYTbclvpTZL3wG89G17y4jR_FIE8TckEQcv5IxfgjC6mnPVr",
  },

  // BAGS
  {
    name: "card.casualBackpack",
    category: "card.backpack",
    price: 39.0,
    rating: 4,
    originalPrice: 45.0,
    mainImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQF3Tt53w88pzHOvzIWHsr-3ZCDP9lhkiXjYNl0m5EcnV4yorNru0o87Y0eEew_4uXXnZfAPuGFV1bngZb8ceH8D8K7utxneqp9w8V10lE5efHqO5oKRg58",
    hoverImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTtvPebReF_y9IAVnZRcCzP-wu9GzLcaEg0zzoKt0-cNpfW-x2V4sTKwv9ETNL3_Y6Skxs2kZhKiv4dPwqrN3rWWUcMA7r2wthCGw4s_Nm1aBFFkxUm4MGG6Q",
  },
  {
    name: "card.luxuryHandbag",
    category: "card.handbag",
    price: 85.0,
    rating: 5,
    originalPrice: 98.0,
    badge: "PREMIUM",
    mainImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSBMn9ZlA42rSpJJttNnz8GoC-5xyLE8wE7w7ayBTIDQHOsK8cu_KNxYnjKCyfxUTWL4u5hCbozRgXbGiGpnWFSSfLcgXYcW4W3PA6Npm_da7ZizUjCgQ7pQA",
    hoverImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSS5r753eTeNUWuipIoHAXNf5S-4I762RLOcov8Gc_gnpSfF-lnAFrp5lImoKYdKLnX_jr-whQA4dYmW_nkA_rX8a6_KXUdCgKLj0Mfj86YgDoRef8nK0I3sw",
  },
  {
    name: "card.simpleToteBag",
    category: "card.toteBag",
    price: 26.0,
    rating: 4,
    originalPrice: 32.0,
    mainImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSMYSRVYBgjON4kuL8BYjUu6OTQ01hnz9EyUoexRrFz5YNrSUU_ys2NILZBlvcO0WscypLUrO2U2VtbqqlwprsyQAnVUgV1LhuAVi9JT0a_DQS-MeFuOrUI_g",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTxIbQewQFZr6MRevJ0lcEnEZzec342g89w2-H3D77B6xfdeP1C2NkAqCuNzU6TVix8sj6HPAqY-qaLDY-c0zzNkVsE6gPC1SALmZJL8XGJ9OdHgBgtVB1iOQ",
  },
  {
    name: "card.menMessengerBag",
    category: "card.messengerBag",
    price: 45.0,
    rating: 4,
    originalPrice: 53.0,
    mainImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTu3ZKezrdsuEz3Pr2xU_H4T5uCe29MwfppTTfHw0dkJR3LvNpX6pGRvR1m5EbAhwwUqmmNJNELTV20oeawvbqxlk7h7MBX-mbW5fV7qZK_vt71tLIbcNvH",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSN9j08DBrpnLVAPoRL7IgouS7gbVTaqrldr9TM_U6ki62y0i2YDEvFMjjTOIQd5GRrGcHUKk2s79rb9tIDX_cr_d3J9wEbeNofmelcNfTF",
  },
  {
    name: "card.sportDuffelBag",
    category: "card.duffelBag",
    price: 42.0,
    rating: 4,
    originalPrice: 50.0,
    mainImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQVV-IjyHaC9pW37R4MbXsExbjYlDcPNgZ7NJDFoEJzVA07VXh2YA7maNSqQGOQcP6saCnAci85mdg99kK2626nkVpeY5nJf3Po5o6m3BGvaOKFDtFAnHZb",
    hoverImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQhZoJ5ia35BPSJoyamBza_Yo7CwoQS7gzTw3X7Fy4Rd5FL3_Ux-HLYCZVbk7Ey-MEDvbdI_15BxF9h-d1KRemb1vMKRUVHMJQ7zsP89A75Yo9CjHkCI9W-mA",
  },

  // BEAUTY
  {
    name: "card.skinCareSet",
    category: "card.skincare",
    price: 38.0,
    rating: 5,
    originalPrice: 45.0,
    badge: "SELF-CARE",
    mainImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQwG0U4--v8Dt7_IzUSBcoFskvMN2rZD7UCmQPuU2bw7_Eqhac0Cv-_cShiZliCkmJlVwh3lIuzshody3UStAvJvXiXVtwM-IbUw4LEIM1h03jy67mBsmT-QA",
    hoverImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT7ScyuTzTqCHuH26j-vxGrNn_FWfesSdmi63VPVHofxlGarYV0PKqu2o_XOjOix_tkl3ZyscK5aaxY7RU4sRudbFnLjdcpEhyL_DMwobc8taBGA27ekcsz",
  },
  {
    name: "card.matteMakeupKit",
    category: "card.makeup",
    price: 44.0,
    rating: 4,
    originalPrice: 53.0,
    mainImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSzdWgGwBRgi7tOdiYILYQzJU-riLJbkzc893Gy_MD33r7V9FcIq6xuhHdAuv3crKQsCYORMnWd7yunWhessqhpRT2NIzJehUuVB2oNQAuFyu7riRG5qDOoLQ",
    hoverImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR54Ye70rypEvS-wKOKNBRks4-jVe9ZSua-hFGLHHET6LNSZqLUHB2gOGMNApIDoK3hgxTFtlBMKTxv40zxVdB1LuA5ZPtd45Pa4pL-2MXqPZkucSw1mUgB",
  },
  {
    name: "card.perfumeSet",
    category: "card.perfume",
    price: 60.0,
    rating: 5,
    originalPrice: 72.0,
    badge: "BESTSELLER",
    mainImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcST3wRrR8VU0PbDZN6Yy4m59S1HJPa9rWaRpfJ0inDMM8PS0vS6EnkwYA889-VbUQz_ZYtzTH8P4Htc31Aq0ZBWDntrraH8m3wEdRvHJQ2M8oLuXNIW73yo",
    hoverImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQmO3X9Q9dkir6oskKQc9O8qha60ob9Jp1njFoP9BfLUjUkXReLqqfHpfo0hoqeKCcqWq-l8PKsj3BrMRx21YNNM7vpYozcnMg2ZYkIn2orQ64P-MNC-NWykA",
  },
  {
    name: "card.haircareEssentials",
    category: "card.haircare",
    price: 32.0,
    rating: 4,
    originalPrice: 38.0,
    mainImage:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcShous-hSVMB4_U5OoV4KZP3acCcWMmo1KOsR8I_mivnKD7vSbU0493bTP8udG0R_4VSi00nU_SoMVP4YWXFuSfZ5idLGm-3Rg45z1Ody4gjXLRC6svrT1M",
    hoverImage:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcsdV47bxxBofsnsouZ-Xn4B3WuAhaF_LXS0vgq6msgVETgL4vee3WpGulVUtIWeBqG0wdRd-JzJrlQ5KczSBk37Dx1PsOyN-brn4m4Bk",
  },
  {
    name: "card.groomingKitMen",
    category: "card.groomingKit",
    price: 50.0,
    rating: 5,
    originalPrice: 58.0,
    mainImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQJmsO0MlAfuPSb7SeSTyTp8Xjh8JJBzngPK3_C-VeYQSc74R9trgOOwPtzOuvWv4VKG02L_naIWVr3E25UB50BMeBmGbXV-L8Uqoj31CRngUw9Fj44xZ_hzg",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSieZNiLyaRVNnCTGgP2PaDX6Grk-aTK8YDZ26Nk9mJGaJ0TJd2k4POmtd6aLvdT3qT_KQ_jP6dFoJPE2gFfz1tkxhYwgJZn2oBdrP7VY4dbvG_tCechD1REQ",
  },
];

const ProductCard = ({ product, currency, onQuickView, onAddToCompare }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [hovered, setHovered] = useState(false);

  const isFavorited = favorites.some((item) => item.name === product.name);
  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites(product.name); // uses product.name as unique key
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      image: product.mainImage,
    };
    addToCart(cartProduct);
  };

  const stars = {
    total: 5, // total number of stars
    filled: Math.floor(product.rating), // number of fully filled stars
  };

  const conversionRate = 83; // 1 USD = 83 INR

  const price =
    currency === "USD"
      ? `$${product.price}`
      : `₹${Math.round(product.price * conversionRate)}`;

  const originalPrice =
    currency === "USD"
      ? `$${product.originalPrice}`
      : `₹${Math.round(product.originalPrice * conversionRate)}`;

  return (
    <div
      className="overflow-visible relative bg-white rounded-xl shadow hover:shadow-xl transition-all p-4 hover:translate-px"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        {/* Images */}
        <img
          src={hovered ? product.hoverImage : product.mainImage}
          alt={product.name}
          className="w-full h-64 object-contain transition-all duration-300 bg-transparent ease-linear"
        />

        {/* Icons */}
        <div
          className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ease-linear ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Favorite */}
          <div className="relative group">
            <button
              onClick={handleFavoriteClick}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <Heart
                size={20}
                color={isFavorited ? "red" : "black"}
                fill={isFavorited ? "red" : "none"}
              />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              {t("card.favorite")}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            </div>
          </div>

          {/* Quick View */}
          <div className="relative group">
            <button
              onClick={() => onQuickView(product)}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <Eye size={20} />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              {t("card.quickView")}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            </div>
          </div>

          {/* Compare */}
          <div className="relative group">
            <button
              onClick={() => onAddToCompare(product)}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
              strokeWidth={1.5}
            >
              <Shuffle size={20} />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              {t("card.compare")}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="relative group">
            <button
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <Plus size={20} />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              {t("card.addToCart")}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Discount badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-col">
        <p className="text-pink-400 font-semibold text-md text-left ml-2 cursor-pointer">
          {t(product.category)}
        </p>
        <h3 className="text-gray-500 text-[1em] mt-1 text-left text-xl tracking-wider ml-2 cursor-pointer hover:text-gray-600 duration-200">
          {t(product.name)}
        </h3>
        <div className="flex justify-start items-start text-yellow-400 mt-2 ml-2">
          {[...Array(stars.total)].map((_, index) => (
            <Star
              key={index}
              fill={index < stars.filled ? "orange" : "none"}
              strokeWidth={1}
            />
          ))}
        </div>
        <div className="mt-2 text-left space-x-4 ml-2">
          <span className="text-lg font-bold text-gray-800">{price}</span>
          <span className="text-gray-400 line-through text-md">
            {originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProductCard, products };
