import { AdsData } from "../screens/Campaign/interfaces";

const count = (amount: AdsData[]) => {
    let cnt = 0;
    for (let i = 0; i < amount.length; i++) {
        cnt = cnt + amount[i].amount
    }
    return cnt
}

export default count