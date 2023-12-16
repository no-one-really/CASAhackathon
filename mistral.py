from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import sys
import time
start_time = time.time()


import intel_extension_for_pytorch as ipex
device = "cpu"

tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.1")
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.1")
dtype = torch.float # or torch.bfloat16
#model = ipex.optimize_transformers(model, dtype=dtype)
messages = [
    {"role": "user", "content": "I need some assistance"},
    {"role": "assistant", "content": "I will help"},
    {"role": "user", "content": "Will black shoe suit white pants tell me "}

]
encodeds = tokenizer.apply_chat_template(messages, return_tensors="pt")
# model.save_pretrained()
model_inputs = encodeds.to(device)
model.to(device)
generated_ids = model.generate(model_inputs, max_new_tokens=1000, do_sample=True)
decoded = tokenizer.batch_decode(generated_ids)
# result = find_nth_occurredecoded[0], target_string, nth_occurrence)
print(decoded[0])
print("--- %s seconds ---" % (time.time() - start_time))
