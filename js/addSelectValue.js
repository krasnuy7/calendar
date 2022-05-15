export const addSelectMonth = (month) => {
    const inner_months =  month.map((item, idx) => `<option value='${idx}'>${item}</option>`).join('')
    document.querySelector(".box_add_holiday_selectMonth").innerHTML = inner_months
}
export const chacngeSelectMonth = (days) => {
    let option = '';
    for(let i = 1; i <= days[0]; i++){
        option += `<option>${i}</option>`
    }
    document.querySelector(".box_add_holiday_selectNumberdays").innerHTML = option;
    
    document.querySelector(".box_add_holiday_selectMonth").addEventListener("change", () => {
        const monthValue = document.querySelector(".box_add_holiday_selectMonth").value
        let option = '';
        for(let i = 1; i <= days[monthValue]; i++){
            option += `<option>${i}</option>`
        }
        document.querySelector(".box_add_holiday_selectNumberdays").innerHTML = option;
    })
}

 