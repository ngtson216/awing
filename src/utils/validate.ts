import { AdsData, SubCampaignsData } from "../screens/Campaign/interfaces"

export const checkNameCampaign = (name: string) => {
    if (name === '' || name === null || name === undefined)
        return true
    else return false
}

export const checkValidationAlert = (nameCamp: string, subCampData: SubCampaignsData[]) => {
    for (let i = 0; i < subCampData.length; i++) {
        if (subCampData[i].name === '' || subCampData[i].name === null || subCampData[i].name === undefined)
            return true
        if (subCampData[i].ads.length < 1) {
            return true;
        }
        for (let j = 0; j < subCampData[i].ads.length; j++) {
            if (subCampData[i].ads[j].name === '' || subCampData[i].ads[j].name === null || subCampData[i].ads[j].name === undefined)
                return true
            if (subCampData[i].ads[j].amount < 1 || subCampData[i].ads[j].amount === null || subCampData[i].ads[j].amount === undefined)
                return true
        }
    }
    if (nameCamp === '' || nameCamp === null || nameCamp === undefined) {
        return true
    }
    else return false
}

export const checkValidationSubName = (subData: SubCampaignsData) => {
    if (subData.name === '' || subData.name === null || subData.name === undefined)
        return true
    else return false
}

export const checkValidationAdsName = (adsData: AdsData) => {
    if (adsData.name === '' || adsData.name === null || adsData.name === undefined)
        return true
    else return false
}

export const checkValidationAdsQuantity = (adsData: AdsData) => {
    if (adsData.amount < 1 || adsData.amount === null || adsData.amount === undefined)
        return true
    else return false
}

export const checkValidationAds = (subData: SubCampaignsData) => {
    if (subData.ads.length < 1)
        return true
    else if (subData.ads.length > 0) {
        for (let j = 0; j < subData.ads.length; j++) {
            if (subData.ads[j].name === '' || subData.ads[j].name === null || subData.ads[j].name === undefined)
                return true
            if (subData.ads[j].amount < 1 || subData.ads[j].amount === null || subData.ads[j].amount === undefined)
                return true
        }
    }
    else return false
}