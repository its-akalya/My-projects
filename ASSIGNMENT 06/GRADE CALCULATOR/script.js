function calculateGrade() {

    // Get marks using prompt
    let sub1 = Number(prompt("Enter marks for Subject 1:"));
    let sub2 = Number(prompt("Enter marks for Subject 2:"));
    let sub3 = Number(prompt("Enter marks for Subject 3:"));
    let sub4 = Number(prompt("Enter marks for Subject 4:"));
    let sub5 = Number(prompt("Enter marks for Subject 5:"));

    // Calculate total
    let total = sub1 + sub2 + sub3 + sub4 + sub5;

    // Calculate average
    let average = total / 5;

    // Grade calculation using if-else
    let grade;

    if (average >= 90) {
        grade = "A+";
    } 
    else if (average >= 80) {
        grade = "A";
    } 
    else if (average >= 70) {
        grade = "B";
    } 
    else if (average >= 60) {
        grade = "C";
    } 
    else if (average >= 50) {
        grade = "D";
    } 
    else {
        grade = "F";
    }

    // Display result using alert
    alert(
        "Total Marks: " + total +
        "\nAverage Marks: " + average.toFixed(2) +
        "\nGrade: " + grade
    );
}
