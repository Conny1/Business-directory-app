// Import the functions you need from the SDKs you need
import { businessType } from "@/utils/types";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  query,
  where,
} from "firebase/firestore/lite";

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

async function getCategories() {
  const categories = collection(db, "categories");
  const categoriesData = await getDocs(categories);
  // console.log(categoriesData.docs[0].data());
  const categoriesList = categoriesData.docs.map((doc) => doc.data());
  return categoriesList;
}

async function getBusinessBytCategory(name: string): Promise<businessType[]> {
  const business = collection(db, "business");
  const q = query(business, where("category", "==", name.toLowerCase()));

  const businesssData = await getDocs(q);
  console.log(businesssData.docs[0].data());
  const businessList = businesssData.docs.map((doc) => doc.data());
  return businessList as businessType[];
}

export { getCategories, getBusinessBytCategory };
