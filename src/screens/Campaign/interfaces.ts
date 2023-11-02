export interface InfomationProps {
    isError: boolean,
    setNameCamp: Function,
    setDesciption: Function,
    name: string,
    desc: string,
}

export interface CardChildProps {
    isError: boolean,
    subCampData: SubCampaignsData,
    onClick: any,
    id: number,
    ind: number,
}

export interface ChildCampaignProps {
    isError: boolean,
    subCampData: SubCampaignsData[],
    setSubCampData: Function,
}

export interface AdsData {
    id: string,
    amount: number,
    name: string,
}

export interface SubCampaignsData {
    id: string,
    name: string,
    status: boolean,
    ads: AdsData[],
}

export interface HeadCell {
    id: keyof AdsData;
    label: string;
    numeric: boolean;
}

export interface EnhancedTableProps {
    selected: any;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
    row: AdsData[];
    setSubCampData: Function;
    subData: SubCampaignsData,
    subCampData: SubCampaignsData[],
}