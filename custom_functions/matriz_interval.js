//verifica se indice i,j está alinhado entre si,sj e ei ej, na vertical, na horizontal ou na diagonal
function inLine(si,sj,ei,ej,i,j){
    var max_i = Math.max(si,ei);
    var max_j = Math.max(sj,ej);
    var min_i = Math.min(si,ei);
    var min_j = Math.min(sj,ej);

    if(i >= min_i && i <= max_i && j >= min_j && j >= max_j){
        if((si == ei && ei == i) || (sj == ej && ej == j) || (((si - sj) == (ei - ej))&&((ei - ej) == (i - j)))){
            return true;
        }
    }
    return false;
}