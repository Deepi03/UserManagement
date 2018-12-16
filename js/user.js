var app =new function() {

    this.el = document.getElementById('users');

    this.users = [];

    this.Count = function(data) {
        var el   = document.getElementById('counter');
        var name = 'User';

        if (data) {
            if (data > 1) {
                name = 'Users';
            }
            el.innerHTML = data + ' ' + name ;
        } else {
            el.innerHTML = 'No ' + name;
        }
    };

    this.FetchAll = function() {
        var allData = '';
        
        if (this.users.length > 0) {
            this.users.forEach(function (user, index) {
                allData += buildUser(user, index)
            });
        }
        this.Count(this.users.length);
        document.getElementById('validationText').innerHTML = "";
        return this.el.innerHTML = allData;
    };

    function buildUser(user, index) {
        var data = '';
        if (index == 0) {
            data = headers();
        }
        data += '<tr>';
        data += '<td class="data">' + user[0] + '</td>';
        data += '<td class="data">' + user[1] + '</td>';
        data += '<td class="data"><button onclick="app.Edit(' + index + ')">Edit</button></td>';
        data += '<td class="data"><button onclick="app.Delete(' + index + ')">Delete</button></td>';
        data += '</tr>';
        return data;
    }

    function headers() {
        var header = '';
        header += '<tr>';
        header += '<td>NAME</td>';
        header += '<td>EMAIL</td>';
        header += '<td colspan="2">ACTION</td>';
        header += '</tr>';
        return header;
    }

    this.Add = function () {
        var nameEle = document.getElementById('add-name');
         var emailEle = document.getElementById('email');
        // Get the value
        var name = nameEle.value;
        var email = emailEle.value;
        var user = new Array();
        user = [name.trim(), email.trim()];
    
       if (isValidData(user)) {
           // Add the new value
            this.users.push(user);
            // Reset input value
            nameEle.value = '';
            emailEle.value = '';
            // Dislay the new list
            this.FetchAll();
       }
    
    };

    this.Edit = function (index) {
        var nameEle = document.getElementById('edit-name');
        var emailEle = document.getElementById('edit-email');
        // Display value in the field
        
        nameEle.value = this.users[index][0];
        emailEle.value = this.users[index][1];
        // Display fields
        document.getElementById('spoiler').style.display = 'block';
        self = this;
        document.getElementById('saveEdit').onsubmit = function() {
            // Get value
            var editedUser = new Array();
            editedUser = [nameEle.value.trim(), emailEle.value.trim()];
            if (isValidData(editedUser)) {
                // Edit value
            self.users.splice(index, 1, editedUser);
            self.FetchAll();
                // Hide fields
                CloseInput();
            }
        }
    };

    this.Delete = function (index) {
        // Delete the current row
        this.users.splice(index, 1);
        // Display the new list
        this.FetchAll();
    };

}

app.FetchAll();

function isValidData(user) {
    if (!isValidUserName(user[0])) {
        document.getElementById('validationText').innerHTML = "Invalid Username";
        return false;
    }
    
    if (!isValidEmail(user[1])) {
        document.getElementById('validationText').innerHTML = "Invalid Email";
        return false;
    }
    return true;
} 

function isValidUserName(name) {
    return name.length > 0 && name.length <= 10;
}

function isValidEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function CloseInput() {
    document.getElementById('spoiler').style.display = 'none';
}
