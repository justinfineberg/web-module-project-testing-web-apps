import React from 'react';
import {render, screen, waitFor, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render (<ContactForm />)
});

test('renders the contact form header', ()=> {
    render (<ContactForm />)
    const header = screen.getByText(/contact/i)
    expect(header).toBeInTheDocument();
    expect(header).not.toBeUndefined(); 
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render (<ContactForm />)
    let firstNameInput = screen.getByLabelText(/first name/i)
    userEvent.type(firstNameInput, "ju")
    let firstNameError = screen.getByText(/Error: firstName must have at least 5 characters./i)
    
    
    expect(firstNameError).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render (<ContactForm />)
    let submitBtn = screen.getByTestId('submit');
    userEvent.click(submitBtn)
    let firstNameError = screen.queryByText(/Error: firstName must have at least 5 characters./i)
    let lastNameError= screen.queryByText(/Error: lastName is a required field/i)
    let emailError=  screen.getByText(/Error: email must be a valid email address./i)
    
    expect(firstNameError).toBeInTheDocument()
    expect(lastNameError).toBeInTheDocument()
    expect(emailError).toBeInTheDocument()

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render (<ContactForm />)
    let firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "justin!")
    let lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, "fineberg!")
    let submitBtn = screen.getByTestId('submit');
    userEvent.click(submitBtn)

    let firstNameError = screen.queryByText(/Error: firstName must have at least 5 characters./i)
    let lastNameError= screen.queryByText(/Error: lastName is a required field/i)
    
    
    
    let emailError = screen.queryByText(/Error: email must be a valid email address./i)

    expect(firstNameError).not.toBeInTheDocument()
    expect(lastNameError).not.toBeInTheDocument()
    expect(emailError).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render (<ContactForm />)

    let emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, "just")
    let emailError = screen.queryByText(/Error: email must be a valid email address./i)
    expect(emailError).toBeInTheDocument()


});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm />)
    let submitBtn = screen.getByTestId('submit');
    userEvent.click(submitBtn)
    let lastNameError= screen.queryByText(/Error: lastName is a required field/i)
 

    expect(lastNameError).toBeInTheDocument()

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render (<ContactForm />)
    let firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "justin!")
    let lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, "fineberg!")
    let emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, "justin@gmail.com")
    let submitBtn = screen.getByTestId('submit');
    userEvent.click(submitBtn)

    let firstNameOutput = screen.queryByText("First Name:")
    let lastNameOutput = screen.queryByText("Last Name:")
    let emailOutput = screen.queryByText("Email:")
    let messageOutput = screen.queryByText("Message:")

    expect(firstNameOutput).toBeInTheDocument()
    expect(lastNameOutput).toBeInTheDocument()
    expect(emailOutput).toBeInTheDocument()
    expect(messageOutput).not.toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {

    render (<ContactForm />)
    let firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "justin!")
    let lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, "fineberg!")
    let emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, "justin@gmail.com")
    let messageInput = screen.getByLabelText(/message/i)
    userEvent.type(messageInput, "Hello World")
    let submitBtn = screen.getByTestId('submit');
    userEvent.click(submitBtn)

    let firstNameOutput = screen.queryByText("First Name:")
    let lastNameOutput = screen.queryByText("Last Name:")
    let emailOutput = screen.queryByText("Email:")
    let messageOutput = screen.queryByText("Message:")

    expect(firstNameOutput).toBeInTheDocument()
    expect(lastNameOutput).toBeInTheDocument()
    expect(emailOutput).toBeInTheDocument()
    expect(messageOutput).toBeInTheDocument()
    
});