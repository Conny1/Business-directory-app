// Import the functions you need from the SDKs you need
import { businessType, CategoryType, Comment } from "@/utils/types";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  query,
  where,
  addDoc,
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
  return categoriesList as CategoryType[];
}

async function getBusinessBytCategory(name: string): Promise<businessType[]> {
  const business = collection(db, "business");
  const q = query(business, where("category", "==", name.toLowerCase()));

  const businesssData = await getDocs(q);

  const businessList = businesssData.docs.map((doc, i) => ({
    ...doc.data(),
    id: businesssData.docs[i].id,
  }));

  return businessList as businessType[];
}

async function getBusinessByID(id: string): Promise<businessType[]> {
  const business = collection(db, "business");
  const q = query(business, where("__name__", "==", id));

  const businesssData = await getDocs(q);

  const businessList = businesssData.docs.map((doc, i) => ({
    ...doc.data(),
    id: businesssData.docs[i].id,
  }));
  return businessList as businessType[];
}

async function getBusinessByUserID(id: string): Promise<businessType[]> {
  const business = collection(db, "business");
  const q = query(business, where("userid", "==", id));

  const businesssData = await getDocs(q);

  const businessList = businesssData.docs.map((doc, i) => ({
    ...doc.data(),
    id: businesssData.docs[i].id,
  }));
  return businessList as businessType[];
}

async function getBusiness(): Promise<businessType[]> {
  const business = collection(db, "business");

  const businesssData = await getDocs(business);

  const businessList = businesssData.docs.map((doc, i) => ({
    ...doc.data(),
    id: businesssData.docs[i].id,
  }));

  return businessList as businessType[];
}
const addData = async (payload: businessType) => {
  try {
    // Get the reference to the 'business' collection
    const businessRef = collection(db, "business");

    // Add the document with the payload
    const businessDoc = await addDoc(businessRef, payload);

    console.log("Document added with ID: ", businessDoc.id);
    return true;
  } catch (error) {
    console.log("Error adding document: ", error);
    return false;
  }
};
const storage = getStorage(app);
const fileUploadFirebase = async (uri: string) => {
  const fileName = Date.now().toString() + ".jpg";
  const resp = await fetch(uri);
  const blob = await resp.blob();

  const storageRef = ref(storage, fileName);

  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, blob);
  let data = await getDownloadURL(storageRef);

  return data;
};
const addComent = async (payload: Comment) => {
  try {
    // Get the reference to the 'business' collection
    const commentRef = collection(db, "comments");

    // Add the document with the payload
    const commentsDoc = await addDoc(commentRef, payload);

    console.log("Document added with ID: ", commentsDoc.id);
    return true;
  } catch (error) {
    console.log("Error adding document: ", error);
    return false;
  }
};

async function getCommentbyBusiness(id: string): Promise<Comment[]> {
 
  const comment = collection(db, "comments");
  const q = query(comment, where("businessid", "==", id));

  const commentsData = await getDocs(q);

  const commentList = commentsData.docs.map((doc, i) => ({
    ...doc.data(),
    id: commentsData.docs[i].id,
  }));
  
  return commentList as Comment[];
}

export {
  getCategories,
  getBusinessBytCategory,
  getBusinessByID,
  getBusiness,
  addData,
  db,
  storage,
  fileUploadFirebase,
  getBusinessByUserID,
  addComent,
  getCommentbyBusiness
};
