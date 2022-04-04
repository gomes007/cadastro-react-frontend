import React from 'react';

class Form_Address extends React.Component {
    render() {
        return (
            <div id="Form">
               <h3>Add a new item to the table</h3>  
                <form onSubmit={this.props.handleFormSubmit}>
                <label htmlFor="username">Username:
                <input id="username" value={this.props.newUsername} 
                    type="text" name="username"
                    onChange={this.props.handleInputChange}/>
                </label>
                <label for="password">
                Password:
                <input id="password" value={this.props.newPassword} 
                    type="password" name="password"
                    onChange={this.props.handleInputChange} />
                </label>
                <button type="submit" value="Submit">Add Item</button>
                </form>
            </div>
        )

    }

}

export default Form_Address