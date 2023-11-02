import { SubCampaignsData } from "../screens/Campaign/interfaces"

export const createAds = (id: string, name: string, amount: number,) => {
    return {
        id,
        name,
        amount
    }
}

export const editAds = (newSubData: SubCampaignsData, subData: SubCampaignsData, subCampData: SubCampaignsData[], setSubCampData: Function) => {
    let newSubCampData = [...subCampData]
    newSubCampData[subCampData.indexOf(subData)] = newSubData;
    setSubCampData(newSubCampData)
}