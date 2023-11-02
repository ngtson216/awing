import { Box, Button, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CardChildCamp from './CardChildCamp';
import { ChildCampaignProps, AdsData, SubCampaignsData, HeadCell, EnhancedTableProps } from '../interfaces';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuid } from 'uuid';
import { createAds, editAds } from '../../../utils/lib';
import { checkValidationAdsName, checkValidationAdsQuantity, checkValidationSubName } from '../../../utils/validate';

const headCells: readonly HeadCell[] = [
    {
        id: "name",
        numeric: false,
        label: "Tên quảng cáo*"
    },
    {
        id: "amount",
        numeric: true,
        label: "Số lượng*"
    }
];

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, selected, numSelected, rowCount, row, setSubCampData, subData, subCampData } = props;
    const deleteMulti = (row: AdsData[], selected: any) => {
        let newAds = [...row];
        for (let i = 0; i < selected.length; i++) {
            newAds = newAds.filter(item => item !== selected[i])
        }
        let newSubData = {
            ...subData,
            ads: newAds,
        }
        editAds(newSubData, subData, subCampData, setSubCampData)
    }
    const addAds = (row: AdsData[], rowCount: number) => {
        let newAds = [...row]
        newAds.push(createAds(uuid(), `Quảng cáo ${rowCount + 1}`, 0))
        let newSubData = {
            ...subData,
            ads: newAds,
        }
        editAds(newSubData, subData, subCampData, setSubCampData)
    }
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" className='checkbox-table'>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        disabled={rowCount === 0 ? true : false}
                    />
                </TableCell>
                {numSelected > 0 ? (<><TableCell>
                    <IconButton onClick={() => deleteMulti(row, selected)}>
                        <DeleteIcon fontSize='small' className='delete-button' titleAccess='Xóa' />
                    </IconButton>
                </TableCell>
                    <TableCell /></>) : headCells.map((headCell) => (
                        <TableCell key={headCell.id}> <Typography
                            component="p"
                        >{headCell.label} </Typography></TableCell>
                    ))}
                <TableCell align='right'>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => addAds(row, rowCount)}
                    >
                        Thêm
                    </Button>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const ChildCampTab: FC<ChildCampaignProps> = (props) => {
    const [subData, setSubData] = React.useState<SubCampaignsData>(props.subCampData[0] || [])
    const [ind, setInd] = React.useState<number>(0)
    const [selected, setSelected] = React.useState<readonly AdsData[]>([]);

    useEffect(() => {
        setSubData(props.subCampData[ind])
    }, [props.subCampData, ind]);

    useEffect(() => {
        setSelected([]);
    }, [subData]);

    const list = (values: SubCampaignsData[], isError: boolean) => {
        const listItem = []
        for (let index = 0; index < values.length; index++) {
            listItem.push(<CardChildCamp
                isError={isError}
                subCampData={values[index]}
                key={index}
                id={index}
                ind={ind}
                onClick={() => {
                    setSubData(values[index]);
                    setInd(index);
                }} />)
        }
        return listItem;
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = subData.ads.map((n) => n);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, data: AdsData) => {
        const selectedIndex = selected.indexOf(data);
        let newSelected: readonly AdsData[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, data);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (data: AdsData) => selected.indexOf(data) !== -1;

    const handleClickAddSub = () => {
        let temp: SubCampaignsData[] = [{
            id: uuid(),
            name: `Chiến dịch con ${props.subCampData.length + 1}`,
            status: true,
            ads: [{
                id: uuid(),
                amount: 0,
                name: "Quảng cáo 1"
            }]
        }]
        let newSubCampData = [...props.subCampData];
        props.setSubCampData(newSubCampData.concat(temp))
        setInd(props.subCampData.length)
    }

    const handleChangeNameSubD = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newSubData = {
            ...subData,
            name: e.target.value
        };
        editAds(newSubData, subData, props.subCampData, props.setSubCampData)
    }

    const handleChangeStatusSubD = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newSubData = {
            ...subData,
            status: !subData.status
        };
        editAds(newSubData, subData, props.subCampData, props.setSubCampData)
    }

    const handleChangeAdsName = (name: string, row: AdsData) => {
        let adsArr = [...subData.ads]
        let newAds = {
            ...row,
            name: name
        }
        adsArr[subData.ads.indexOf(row)] = newAds;
        let newSubData = {
            ...subData,
            ads: adsArr
        }
        editAds(newSubData, subData, props.subCampData, props.setSubCampData)
    }

    const handleChangeAdsQuantity = (amount: string, row: AdsData) => {
        let adsArr = [...subData.ads]
        let newAds = {
            ...row,
            amount: Number(amount)
        }
        adsArr[subData.ads.indexOf(row)] = newAds;
        let newSubData = {
            ...subData,
            ads: adsArr
        }
        editAds(newSubData, subData, props.subCampData, props.setSubCampData)
    }

    const handleClickDel = (row: AdsData) => {
        let newRow = [...subData.ads];
        newRow.splice(newRow.indexOf(row), 1)
        let newSubData = {
            ...subData,
            ads: newRow,
        }
        editAds(newSubData, subData, props.subCampData, props.setSubCampData)
    }
    return (
        <>
            <Box className='child-camp-box'>
                <Grid container>
                    <Grid item xs={12} className='overflow-grid'>
                        <div className='div-flex-row '>
                            <div>
                                <IconButton
                                    color="error"
                                    size="large"
                                    className='icon-button-add'
                                    onClick={() => handleClickAddSub()}
                                >
                                    <AddIcon />
                                </IconButton>
                            </div>
                            {list(props.subCampData, props.isError)}
                        </div>
                    </Grid>
                    <Grid item xs={12} className='info-grid-child-camp'>
                        <Grid container>
                            <Grid item xs={8} className='text-field-child-camp'>
                                <TextField
                                    error={(props.isError && checkValidationSubName(subData))}
                                    id="standard-error-helper-text"
                                    label="Tên chiến dịch con *"
                                    variant="standard"
                                    fullWidth
                                    className='form-control-margin'
                                    value={subData.name}
                                    onChange={handleChangeNameSubD}
                                />
                            </Grid>
                            <Grid item xs={4} className='div-checkbox'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            defaultChecked={subData.status}
                                            onChange={handleChangeStatusSubD}
                                        />
                                    }
                                    label="Đang hoạt động"
                                    className='form-control-label-checkbox' />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <TableContainer>
                    <Typography variant="h6" component="div" className='title-table'>
                        DANH SÁCH QUẢNG CÁO
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={"medium"}
                            >
                                <EnhancedTableHead
                                    selected={selected}
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={subData.ads.length}
                                    row={subData.ads}
                                    setSubCampData={props.setSubCampData}
                                    subData={subData}
                                    subCampData={props.subCampData}
                                />
                                <TableBody>
                                    {subData.ads.map((row, index) => {
                                        const isItemSelected = isSelected(row);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: "pointer" }}
                                                className={isSelected(row) ? 'table-row-selected' : ''}
                                            >
                                                <TableCell padding="checkbox" className='table-cell-default-cur'>
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            "aria-labelledby": labelId
                                                        }}
                                                        onClick={(event) => handleClick(event, row)}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    id={labelId}
                                                    className='table-cell-padding table-cell-default-cur'
                                                >
                                                    <TextField
                                                        error={(props.isError && checkValidationAdsName(row))}
                                                        id="standard-error-helper-text"
                                                        variant="standard"
                                                        value={row.name}
                                                        onChange={(e) => handleChangeAdsName(e.target.value, row)}
                                                    />
                                                </TableCell>
                                                <TableCell className='table-cell-padding table-cell-width table-cell-default-cur'>
                                                    <TextField
                                                        error={(props.isError && checkValidationAdsQuantity(row))}
                                                        id="standard-error-helper-text"
                                                        variant="standard"
                                                        fullWidth
                                                        type="number"
                                                        value={row.amount}
                                                        onChange={(e) => handleChangeAdsQuantity(e.target.value, row)}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className='table-cell-default-cur'
                                                >
                                                    <IconButton disabled={isSelected(row)} onClick={() => handleClickDel(row)} >
                                                        <DeleteIcon
                                                            fontSize='small'
                                                            className={isSelected(row) ? 'delete-button-disable' : 'delete-button'}
                                                            titleAccess='Xóa'
                                                        />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </TableContainer>
            </Box>
        </>
    );
}

export default ChildCampTab;
