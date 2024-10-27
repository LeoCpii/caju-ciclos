export function getInitials(name: string) {
    const names: string[] = name.trim().split(' ');

    const firstInitial = names[0].charAt(0);

    const secondInitial = names.reverse()[0].charAt(0);

    return firstInitial + secondInitial;
};
