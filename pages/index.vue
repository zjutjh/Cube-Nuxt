<script setup lang="ts">
import { getBucket } from "~/services/service";

const router = useRouter();
onMounted(async () => {
  try {
    await getBucket();
    router.push("/home");
  } catch {
    router.push("/login");
  }
});
</script>
