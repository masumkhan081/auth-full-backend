export const useLocalStorage = (name: string): Function[] => {
   const getLocalStorage = () => {
       const local = localStorage.getItem(name)
       if(local != null){
           return JSON.parse(local)
       }
       return null
    }
   const setLocalStorage = (item: Object) => {
      localStorage.setItem(name, JSON.stringify(item))
   }
   const removeLocalStorage = () => {
       return localStorage.removeItem(name)
   }
   return [getLocalStorage, setLocalStorage, removeLocalStorage]
}


/*
import { useEffect, useState } from "react"
import { useLocalStorage } from "./components/useLocalStorage"
export const App = () => {
interface InputForm {
  name: string
  website: string
  contact: Contact
}
interface Contact {
  cell: string
  email: string
}
let initialForm: InputForm = {
  name: "",
  website: "",
  contact: {
    cell: "",
    email: ""
  }
}
const [savedForm, setSavedForm, clearLocalStorage] = useLocalStorage("inputForm")
const [inputFormState, setInputFormState] = useState<InputForm>(savedForm() || initialForm)
const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = event.target
  if(name === "name" || name === "website"){
    setInputFormState((prev) => {
      const newForm = {...prev}
      newForm[name] = value
      return newForm
    })
  }
  if(name === "cell" || name === "email"){
    setInputFormState((prev) => {
      let newForm:InputForm = {...prev}
      newForm.contact[name] = value
      return newForm
    })
  }
}
useEffect(() => {
  setSavedForm(inputFormState)
},[setSavedForm,inputFormState])
return(
 <div>
    <div><h3>React js Local Storage</h3></div>
    <div>Name:</div><div><input name="name" value={inputFormState?.name} onChange={(e) => handleFormChange(e)}/></div>
    <div>Website:</div><div><input name="website" value={inputFormState?.website} onChange={(e) => handleFormChange(e)}/></div>
    <div>Cell:</div><input name="cell" value={inputFormState?.contact?.cell} onChange={(e) => handleFormChange(e)}/></div>
    <div>Email:</div><input name="email" value={inputFormState?.contact?.email} onChange={(e) => handleFormChange(e)}/></div>
    <div><button onClick={()=>clearLocalStorage()}>Clear Cache</button></div>
  </div>
 )
}
export default App

*/