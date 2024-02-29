window.onload = function () {
    //     var form = document.getElementById('form1');
    //     // console.log(form);

    //     form.addEventListener("submit", function(event)
    //     {
    //         //prevent Default method cancel event if it is cancelable  meaning of this is default action binded to event that will not executed
    //         event.preventDefault();
    //         var name=document.getElementById("name").value;

    //         //to get profile image
    //         let imageselctor=document.getElementsByName("profile");
    //         let profileImage="";
    //         for(i of imageselctor)
    //         {
    //             if(i.checked)
    //             {
    //                 profileImage=i.value;
    //             }
    //         }

    //         //to get gender
    //         var gender=document.getElementsByName("Gender");
    //         let gendervalue="";
    //         for(i of gender)
    //         {
    //             if(i.checked)
    //             {
    //               gendervalue=i.value;  
    //             }
    //         }

    //         //to get department list
    //         let departments=[];
    //         let departmentname=document.getElementsByName("department");
    //         for(i of departmentname)
    //         {
    //             if(i.checked)
    //             {
    //                 departments.push(i.value);
    //             }
    //         }
    //         //to get value of salary, date, month, dat, year, notes
    //         var salary=document.getElementById("slry").value;
    //         let day=document.getElementById("day").value;
    //         let month=document.getElementById("month").value;
    //         let year=document.getElementById("year").value;
    //         var notes=document.getElementById("notes").value;
    //         let date="";

    //         let employeeobject = {
    //             name : name,
    //             profileImage : profileImage,
    //             gender : gendervalue,
    //             salary : salary,
    //             date : day+"/"+month+"/"+year,
    //             notes : notes
    //         }

    //         console.log(employeeobject);

    //         console.log(name,profileImage,gender,salary,date,notes);


    //     }

    //     )

    // }

    // $(document).ready(function () {
    //     $("#form1").submit(function (event) {
    //         event.preventDefault();

    //         onSubmit();
    //     });
    // });
}


function onSubmit() {
    let name = $("#name").val();
    let profileImage = $("input[name='profile']:checked").val();
    let gendervalue = $("input[name='Gender']:checked").val();

    let departments = [];
    $("input[name='department']:checked").each(
        function () {
            departments.push($(this).val());
        });

    let salary = $("#slry").val();
    let day = $("#day").val();
    let month = $("#month").val();
    let year = $("#year").val();
    let notes = $("#notes").val();
    let date = "";

    let object =
    {
        name: name,
        profileImage: profileImage,
        gender: gendervalue,
        salary: salary,
        departments: JSON.stringify(departments),
        date: day + "/" + month + "/" + year,
        notes: notes
    }

    console.log(name + " " + profileImage + " " + departments + " " + salary + " " + date + " " + notes);
    console.log(object);

    $.ajax({
        url: `http://localhost:3000/Data1`,
        type: 'POST',
        contenttype: "application/json",
        data: JSON.stringify(object),
        success: function (response) {
            alert("data posted sucessfullly...", response);
        },
        error: function (status, error) {
            console.error('Error:', status, error);
        }
    });

}


let id = localStorage.getItem('id1');
$(function () {
    if (localStorage.getItem('id1')) {
        // onSubmit();
        getData();
        $('#submit-btn').hide();
        $('#update-btn').show();
    }
    else {
        $('#submit-btn').show();
        $('#update-btn').hide();
    }
})
$("#update-btn").on('click', updatedData);
//$("#form1").on('submit',onsubmit);

function getData() {
    $.ajax({
        url: `http://localhost:3000/Data1/${id}`,
        type: 'GET',
        success: function (data) {
            $('#name').val(data.name);
            $("input[name='profile']").each(function () {
                if (data.profileImage === $(this).val()) {
                    $(this).prop('checked', true);
                    return false;
                }
            });

            if (data.gender === 'male') {
                $('#Gender1').prop('checked', true);
            }
            else {
                $('#Gender2').prop('checked', true);
            }
            console.log(data.departments);
            let depart = JSON.parse(data.departments);

            for (let i = 0; i < depart.length; i++) {
                $("input[name='department']").each(function () {
                    console.log($(this).val());
                    if (depart[i] === $(this).val()) {
                        console.log(depart[i]);
                        $(this).prop('checked', true);
                        return false;
                    }
                })
            }
            $('#slry').val(data.salary);
            console.log(data.date);
            $('#day').val(data.date.split('/')[0]);
            $('#month').val(data.date.split('/')[1]);
            $('#year').val(data.date.split('/')[2]);
            $('#notes').val(data.notes);
        }
    })
}

function updatedData() {
    console.log(id);

    let name = $("#name").val();
    let profileImage = $("input[name='profile']:checked").val();
    let gendervalue = $("input[name='Gender']:checked").val();

    let departments = [];
    $("input[name='department']:checked").each(
        function () {
            departments.push($(this).val());
        });

    let salary = $("#slry").val();
    let day = $("#day").val();
    let month = $("#month").val();
    let year = $("#year").val();
    let notes = $("#notes").val();

    let object1 =
    {
        name: name,
        profileImage: profileImage,
        gender: gendervalue,
        salary: salary,
        departments: JSON.stringify(departments),
        date: day + "/" + month + "/" + year,
        notes: notes
    }
    $(function () {
        $.ajax({
            url: `http://localhost:3000/Data1/${id}`,
            type: 'PUT',
            contenttype: "application/json",
            data: JSON.stringify(object1),
            success: function (data) {
                localStorage.removeItem('id1');
                alert("data updated sucessfully...", data);
                onReset();
                window.location.href = "http://127.0.0.1:5501/HTML/EmployeeTable.html";
            },
            error: function (error) {
                console.log(error);
            }

        });
    });
}

function onCancel() {
    localStorage.removeItem('id1');
    window.history.go(-1);
}

function onReset() {
    $('#form1')[0].reset();
}
