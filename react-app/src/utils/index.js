export const getAge = (date) => {
    const today = new Date();
    const birthday = new Date(date);
    birthday.setDate(birthday.getUTCDate());
    const year = 1000 * 60 * 60 * 24 * 365;
    const age = Math.floor((today - birthday)/year);
    return age;
}
