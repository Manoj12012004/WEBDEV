const email=document.getElementById("email");
email.addEventListener('input',()=>validate(email));
const submit=document.getElementById("submit");
submit.addEventListener('onclick',()=>validate(email))
function validate(element){
    if(element.validity.typeMismatch){
        element.setCustomValidity('The Email is not in right format');
        element.reportValidity();
    } else{
        element.setCustomValidity("");
    }
}

let userform=document.getElementById("userform");
const retrieveEntry=()=>{
    let entries=localStorage.getItem('user-entries');
    if(entries){
        entries=JSON.parse(entries)
    } else{
        entries=[]
    }
    return entries
}
let userentries=retrieveEntry();
const displayentry=()=>{
    const entries=retrieveEntry();
    const tableEntries=entries.map((entry)=>{
        const nameCell=`<td>${entry.name}</td>`
        const emailCell=`<td>${entry.email}</td>`
        const passwordCell=`<td>${entry.password}</td>`
        const dobCell=`<td>${entry.dob}</td>`
        const acceptedtocCell=`<td>${entry.acceptedtoc}</td>`
        const row=`<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptedtocCell}</tr>`
        return row
    }).join("\n")
    const table=`<table>
    <tr>
    <td>Name</td>
    <td>Email</td>
    <td>Password</td>
    <td>DOB</td>
    <td>AcceptedT/C</td>
    </tr>
    <tr>${tableEntries}</tr>
    </table>`
    let details=document.getElementById("userentry")
    details.innerHTML=table
}
const saveUserform=(event)=>{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;
    const acceptedtoc=document.getElementById("accepttac").checked;

    const entry={
        name:name,
        email:email,
        password:password,
        dob:dob,
        acceptedtoc:acceptedtoc
    };
    userentries.push(entry);
    localStorage.setItem('user-entries',JSON.stringify(userentries));
    displayentry();

}
userform.addEventListener('submit',saveUserform);
displayentry();

