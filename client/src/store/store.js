import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    password: "",
    active: false,
  },
  setUsername: (username) =>
    set((state) => ({ auth: { ...state.auth, username: username } })),
}));
export const usePatientAuthStore = create((set) => ({
  auth: {
    name: "",
    password: "",
    active: false,
  },
  setName: (name) => set((state) => ({ auth: { ...state.auth, name: name } })),
}));

export const usePatientData = create((set) => ({
  datavalue: "",
  setDataValue: (datavalue) => set((state) => ({ datavalue: datavalue })),
}));

export const usePatientDataId = create((set) => ({
  id: "",
  setId: (id) => set((state) => ({ id: id })),
}));
export const usePatientDataName = create((set) => ({
  name: "",
  setName: (name) => set((state) => ({ name: name })),
}));
export const usePatientDataAge = create((set) => ({
  age: "",
  setAge: (age) => set((state) => ({ age: age })),
}));
export const usePatientDataGender = create((set) => ({
  gender: "",
  setGender: (gender) => set((state) => ({ gender: gender })),
}));
export const usePatientDataMedicalHistory = create((set) => ({
  medicalhistory: "",
  setMedicalHistory: (medicalhistory) =>
    set((state) => ({ medicalhistory: medicalhistory })),
}));

export const usePatientDataFormId = create((set) => ({
  idForm: "",
  setIdForm: (idForm) => set((state) => ({ idForm: idForm })),
}));
export const usePatientDataFormName = create((set) => ({
  nameForm: "",
  setNameForm: (nameForm) => set((state) => ({ nameForm: nameForm })),
}));
export const usePatientDataFormAge = create((set) => ({
  ageForm: "",
  setAgeForm: (ageForm) => set((state) => ({ ageForm: ageForm })),
}));
export const usePatientDataFormGender = create((set) => ({
  genderForm: "",
  setGenderForm: (genderForm) => set((state) => ({ genderForm: genderForm })),
}));
export const usePatientDataFormMedicalHistory = create((set) => ({
  medicalhistoryForm: "",
  setMedicalhistoryForm: (medicalhistoryForm) =>
    set((state) => ({ medicalhistoryForm: medicalhistoryForm })),
}));
