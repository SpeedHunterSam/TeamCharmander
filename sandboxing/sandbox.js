// {/* <div class="progress">
//     <div class="determinate" style="width: 70%"></div>
// </div> */}

const progress = document.getElementById("progress");

const determinate = document.createElement("div");
determinate.classList.add("determinate");

function width(a, b) {
    let ratio = a / b * 100;
    return ratio;
}

console.log(width(2, 4));

determinate.setAttribute("style", "width: " + width(2, 4) + "%");

progress.append(determinate);