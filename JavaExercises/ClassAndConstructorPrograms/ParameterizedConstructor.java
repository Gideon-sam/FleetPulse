package JavaExercises.ClassAndConstructorPrograms;

class Employee {
    String name;
    int id;

    Employee(String n, int i) {
        name = n;
        id = i;
    }

    void display() {
        System.out.println("Employee Name: " + name + ", ID: " + id);
    }
}

public class ParameterizedConstructor {
    public static void main(String[] args) {
        Employee e1 = new Employee("Rahul", 101);
        Employee e2 = new Employee("Anita", 102);
        e1.display();
        e2.display();
    }
}
