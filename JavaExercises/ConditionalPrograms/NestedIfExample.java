package JavaExercises.ConditionalPrograms;

public class NestedIfExample {
    public static void main(String[] args) {
        int age = 25;
        int weight = 55;

        if (age >= 18) {
            if (weight > 50) {
                System.out.println("Eligible for blood donation");
            } else {
                System.out.println("Not eligible (weight issue)");
            }
        } else {
            System.out.println("Not eligible (underage)");
        }
    }
}
