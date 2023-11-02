import React, { FC } from 'react';
import { AppBar, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InfomationTab from './components/Infomation';
import ChildCampTab from './components/ChildCampaign';
import { SubCampaignsData } from './interfaces';
import { v4 as uuid } from 'uuid';
import { checkValidationAlert } from '../../utils/validate';

const Campaign: FC = () => {
    const [value, setValue] = React.useState('1');
    const [isError, setError] = React.useState<boolean>(false);
    const [nameCamp, setNameCamp] = React.useState<string>('');
    const [descCamp, setDescCamp] = React.useState<string>('');
    const [subCampData, setSubCampData] = React.useState<SubCampaignsData[]>([{
        id: uuid(),
        name: "Chiến dịch con 1",
        status: true,
        ads: [{
            id: uuid(),
            amount: 0,
            name: "Quảng cáo 1"
        }]
    }])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleClickSubmit = (event: React.MouseEvent) => {
        const subCampaigns = subCampData.map((item) => {
            return {
                name: item.name,
                status: item.status,
                ads: item.ads,
            }
        })
        let mess = {
            campaign: {
                infomation: {
                    name: nameCamp,
                    describe: descCamp
                },
                subCampaigns: subCampaigns
            }
        }
        if (checkValidationAlert(nameCamp, subCampData)) {
            alert('Vui lòng điền đúng và đầy đủ thông tin')
            setError(true);
        }
        else {
            alert(JSON.stringify(mess));
        }
    };
    return (
        <>
            <Grid container className='grid-padding'>
                <Grid item xs={12} className='grid-border-bot'>
                    <Box className='flex-end-box'>
                        <Button
                            variant="contained"
                            onClick={handleClickSubmit}
                        >Submit</Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container className='grid-body-container'>
                <Grid item xs={12} >
                    <Paper>
                        <AppBar position='static' color='transparent'>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange}                                    >
                                        <Tab label="THÔNG TIN" value="1" />
                                        <Tab label="CHIẾN DỊCH CON" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <InfomationTab
                                        isError={isError}
                                        setNameCamp={setNameCamp}
                                        setDesciption={setDescCamp}
                                        name={nameCamp}
                                        desc={descCamp}
                                    />
                                </TabPanel>
                                <TabPanel value="2" className='tab-panel-set'>
                                    <ChildCampTab
                                        isError={isError}
                                        subCampData={subCampData}
                                        setSubCampData={setSubCampData}
                                    />
                                </TabPanel>
                            </TabContext>
                        </AppBar>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default Campaign;
