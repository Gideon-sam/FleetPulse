package JavaExercises.ClassAndConstructorPrograms;

class Student {
    String name;
    int age;

    void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

public class ClassObjectExample {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Riya";
        s1.age = 21;
        s1.display();
    }
}
