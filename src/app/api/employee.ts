"use server";

export const registerEmployee = async (formData: FormData) => {
    const employeeData = Object.fromEntries(formData.entries());
    console.log(employeeData)

    // if (!validatedFields.success) {
    //     return {
    //         errors: validatedFields.error.flatten().fieldErrors,
    //         message: 'Missing Fields. Failed to Create Invoice.',
    //     };
    // }
};
