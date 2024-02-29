window.onload = function () {
    $(document).ready(function () {
        $.get('http://localhost:3000/Data1', function (data) 
        {
            console.log(data);
            
            for (let i of data) {
                console.log(i);
                let department=JSON.parse(i.departments);
                let tr = `<tr>
                <td><img style="height:20px;width:20px;cursor:pointer" src="${i.profileImage}"
                alt=""></td>
                <td>${i.name}</td>
                <td>${i.gender}</td>
                <td>${department.map((department) => {
                    return `<span>${department}</span>`
                })}</td>
                <td>${i.salary}</td>
                <td>${i.date}</td>
                <td>
                    <img onclick="del('${i.id}')" style="height:15px;width:15px;cursor:pointer" src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png">
                    <img onclick="edit('${i.id}')" style="height:15px;width:15px;cursor:pointer" src="https://cdn-icons-png.flaticon.com/512/61/61456.png">
                </td>
                </tr>`
                $(".myclass").append(tr);

            }
        });
    });
}
function del(id) 
{
    console.log(id);
    $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/Data1/${id}`,
        success: function () {
            alert('data deleted sucessfully...');
        },
        error: function (status, error) {
            console.log("Error in deleting data:", status, error);
        }
   });
}


function edit(id) 
{
    localStorage.setItem("id1",id);
    window.location.href= "http://127.0.0.1:5501/HTML/EmployeePayrollForm.html";

    

}



