function find_max(nums){
    let max_num = 1;
    for(let num of nums){
        if (num > max_num){
            num = max_num
        }
    }
    return max_num;
}