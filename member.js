function skillsMember() {
    var member = {
        name: "John",
        age: 30,
        skills: ["JavaScript", "HTML", "CSS"],
        salary: 40000,
        address: {
            city: "New York",
            pincode: 56000
        },
        getAge: function () {
            return this.age;
        },
        getCity: function () {
            return this.address.city;
        },
        getPincode: function () {
            return this.address.pincode;
        }
    };
    console.log(member.getAge());
    console.log(member.getCity());
    console.log(member.getPincode());
}